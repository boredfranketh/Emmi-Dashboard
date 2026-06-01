"use client"

import { Fragment } from "react"

function formatInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }

    return <Fragment key={index}>{part}</Fragment>
  })
}

export function FormattedMessage({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let listItems: string[] = []
  let listType: "ul" | "ol" | null = null

  const flushList = () => {
    if (listItems.length === 0) return

    const ListTag = listType === "ol" ? "ol" : "ul"
    elements.push(
      <ListTag
        key={`list-${elements.length}`}
        className={
          listType === "ol"
            ? "my-2 list-decimal space-y-1 pl-4 text-sm text-foreground"
            : "my-2 list-disc space-y-1 pl-4 text-sm text-foreground"
        }
      >
        {listItems.map((item, index) => (
          <li key={index} className="leading-relaxed">
            {formatInline(item)}
          </li>
        ))}
      </ListTag>
    )
    listItems = []
    listType = null
  }

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim()

    if (!line) {
      flushList()
      return
    }

    if (/^-{3,}$/.test(line)) {
      flushList()
      elements.push(
        <hr key={`hr-${index}`} className="my-3 border-border" />
      )
      return
    }

    if (line.startsWith("### ")) {
      flushList()
      elements.push(
        <h4
          key={`h4-${index}`}
          className="mb-1 mt-3 text-sm font-semibold text-foreground"
        >
          {formatInline(line.slice(4))}
        </h4>
      )
      return
    }

    if (line.startsWith("## ")) {
      flushList()
      elements.push(
        <h3
          key={`h3-${index}`}
          className="mb-1 mt-3 text-sm font-bold text-foreground"
        >
          {formatInline(line.slice(3))}
        </h3>
      )
      return
    }

    if (line.startsWith("# ")) {
      flushList()
      elements.push(
        <h2
          key={`h2-${index}`}
          className="mb-1 mt-3 text-base font-bold text-foreground"
        >
          {formatInline(line.slice(2))}
        </h2>
      )
      return
    }

    const bulletMatch = line.match(/^[-*•]\s+(.+)/)
    if (bulletMatch) {
      if (listType !== "ul") {
        flushList()
        listType = "ul"
      }
      listItems.push(bulletMatch[1])
      return
    }

    const numberedMatch = line.match(/^\d+\.\s+(.+)/)
    if (numberedMatch) {
      if (listType !== "ol") {
        flushList()
        listType = "ol"
      }
      listItems.push(numberedMatch[1])
      return
    }

    flushList()
    elements.push(
      <p key={`p-${index}`} className="text-sm leading-relaxed text-foreground">
        {formatInline(line)}
      </p>
    )
  })

  flushList()

  return <div className="space-y-1">{elements}</div>
}
