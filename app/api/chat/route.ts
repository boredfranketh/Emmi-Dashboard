import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are the EMMI Planning Intelligence Copilot, an AI assistant for EMMI's executive team (CEO, COO, CTO). You have deep knowledge of EMMI's operations across 11 markets (CH, DE, AT, ES, IT, FR, NL, UK, US, BR, CL), 73 production sites, and key products: Caffè Latte, Kaltbach Cheese, Aktifit, Energy Milk, Mademoiselle Desserts. Total revenue CHF 4.75B in 2025. Key data: Spain Caffè Latte demand surging +18% with supply gap risk; Brazil production line P3 bottleneck; Germany Kaltbach inventory at 23 days above 18-day target; forecast accuracy 87.4% overall. Respond concisely like a senior supply chain expert. End every response with: CONFIDENCE: [number]% | SOURCES: [source1], [source2], [source3]`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Anthropic API key is not configured" },
        { status: 500 }
      )
    }

    const anthropic = new Anthropic({ apiKey })

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: message.trim() }],
    })

    const textBlock = response.content.find((block) => block.type === "text")
    const responseText =
      textBlock?.type === "text" ? textBlock.text : ""

    return NextResponse.json({ response: responseText })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    )
  }
}
