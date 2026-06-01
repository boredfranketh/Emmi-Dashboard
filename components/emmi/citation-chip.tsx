"use client"

import { cn } from "@/lib/utils"

interface CitationChipProps {
  source: string
  className?: string
}

export function CitationChip({ source, className }: CitationChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded bg-[#2A2A34] text-muted-foreground",
        className
      )}
    >
      {source}
    </span>
  )
}
