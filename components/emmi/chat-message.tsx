"use client"

import { cn } from "@/lib/utils"
import { CitationChip } from "./citation-chip"
import { FormattedMessage } from "./formatted-message"
import { User, Sparkles } from "lucide-react"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  citations?: string[]
  confidence?: number
  inlineChart?: React.ReactNode
  className?: string
}

export function ChatMessage({
  role,
  content,
  citations,
  confidence,
  inlineChart,
  className,
}: ChatMessageProps) {
  return (
    <div className={cn("flex gap-3", className)}>
      <div
        className={cn(
          "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
          {
            "bg-[#2A2A34]": role === "user",
            "bg-[#5BC5E8]/20": role === "assistant",
          }
        )}
      >
        {role === "user" ? (
          <User className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Sparkles className="w-4 h-4 text-[#5BC5E8]" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        {role === "assistant" ? (
          <FormattedMessage content={content} />
        ) : (
          <p className="text-sm text-foreground leading-relaxed">{content}</p>
        )}
        {inlineChart && <div className="mt-2">{inlineChart}</div>}
        {(citations || confidence) && (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {citations?.map((source, i) => (
              <CitationChip key={i} source={source} />
            ))}
            {confidence && (
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded bg-[#5BC5E8]/20 text-[#5BC5E8]">
                Confidence: {confidence}%
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
