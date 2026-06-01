"use client"

import { cn } from "@/lib/utils"

type Status = "on-plan" | "at-risk" | "critical"

interface StatusDotProps {
  status: Status
  className?: string
}

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        "inline-block w-2.5 h-2.5 rounded-full",
        {
          "bg-[#22C55E]": status === "on-plan",
          "bg-[#F59E0B]": status === "at-risk",
          "bg-[#C8102E]": status === "critical",
        },
        className
      )}
    />
  )
}
