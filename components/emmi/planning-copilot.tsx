"use client"

import { useState } from "react"
import { ChatMessage } from "./chat-message"
import { Send, Sparkles } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { initialChatHistory } from "@/lib/mockData"

type Message = {
  role: "user" | "assistant"
  content: string
  citations?: string[]
  confidence?: number
  showChart?: boolean
}

const suggestedQuestions = [
  "Why is Spain Caffè Latte demand surging?",
  "Which markets are most at risk of overstock?",
  "Compare Kaltbach sales DE vs AT last 90 days",
  "Generate this week's S&OP summary for the board",
]

function parseAssistantResponse(response: string): {
  content: string
  confidence?: number
  citations?: string[]
} {
  const footerPattern = /\n*CONFIDENCE:\s*\d+%\s*\|\s*SOURCES:.+$/i
  const footerMatch = response.match(footerPattern)

  const confidenceMatch = response.match(/CONFIDENCE:\s*(\d+)%/i)
  const sourcesMatch = response.match(/SOURCES:\s*(.+)$/im)

  const content = footerMatch
    ? response.slice(0, footerMatch.index).trim()
    : response.trim()

  const confidence = confidenceMatch
    ? parseInt(confidenceMatch[1], 10)
    : undefined

  const citations = sourcesMatch
    ? sourcesMatch[1]
        .split(",")
        .map((source) => source.trim())
        .filter(Boolean)
    : undefined

  return { content, confidence, citations }
}

const comparisonData = [
  { country: "DE", sales: 2340 },
  { country: "AT", sales: 1890 },
]

function InlineComparisonChart() {
  return (
    <div className="bg-[#0F0F12] rounded-md p-3 border border-border">
      <div className="text-[10px] text-muted-foreground mb-2">
        Kaltbach Cheese Sales (last 90 days, tonnes)
      </div>
      <div className="h-[60px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData} layout="vertical">
            <XAxis
              type="number"
              tick={{ fill: "#B0BECF", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 3000]}
            />
            <YAxis
              type="category"
              dataKey="country"
              tick={{ fill: "#B0BECF", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              width={25}
            />
            <Bar dataKey="sales" fill="#5BC5E8" radius={[0, 3, 3, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-[10px] text-muted-foreground mt-2">
        Germany leads Austria by <span className="text-[#5BC5E8] font-medium">23.8%</span>
      </div>
    </div>
  )
}

export function PlanningCopilot() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>(initialChatHistory)
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (message: string) => {
    const trimmed = message.trim()
    if (!trimmed || isLoading) return

    setMessages((prev) => [...prev, { role: "user", content: trimmed }])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      const parsed = parseAssistantResponse(data.response)

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: parsed.content,
          confidence: parsed.confidence,
          citations: parsed.citations,
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? `Sorry, I couldn't process that request. ${error.message}`
              : "Sorry, something went wrong. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void sendMessage(input)
  }

  const handleSuggestion = (question: string) => {
    void sendMessage(question)
  }

  return (
    <aside className="w-[380px] bg-card border-l border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#5BC5E8]/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#5BC5E8]" />
          </div>
          <span className="font-semibold text-foreground text-sm">
            Planning Copilot
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Ask anything about your data
        </p>
      </div>

      <div className="p-4 border-b border-border">
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">
          Suggested questions
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSuggestion(q)}
              disabled={isLoading}
              className="px-2.5 py-1.5 text-[11px] text-muted-foreground bg-[#0F0F12] border border-border rounded-md hover:border-muted-foreground transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            role={msg.role}
            content={msg.content}
            citations={"citations" in msg ? msg.citations : undefined}
            confidence={"confidence" in msg ? msg.confidence : undefined}
            inlineChart={"showChart" in msg && msg.showChart ? <InlineComparisonChart /> : undefined}
          />
        ))}
        {isLoading && (
          <ChatMessage role="assistant" content="Analysing..." />
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex items-center gap-2 bg-[#0F0F12] border border-border rounded-md px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-7 h-7 rounded-md bg-[#5BC5E8] flex items-center justify-center hover:bg-[#5BC5E8]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5 text-[#0F0F12]" />
          </button>
        </div>
        <p className="text-[9px] text-muted-foreground mt-2 text-center">
          Powered by Claude — human approval required for GxP-relevant actions
        </p>
      </form>
    </aside>
  )
}
