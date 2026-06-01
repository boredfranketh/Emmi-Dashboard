"use client"

import { cn } from "@/lib/utils"

type Severity = "critical" | "warning" | "info"

interface SeverityPillProps {
  severity: Severity
  className?: string
}

export function SeverityPill({ severity, className }: SeverityPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full",
        {
          "bg-[#C8102E]/20 text-[#C8102E]": severity === "critical",
          "bg-[#F59E0B]/20 text-[#F59E0B]": severity === "warning",
          "bg-[#5BC5E8]/20 text-[#5BC5E8]": severity === "info",
        },
        className
      )}
    >
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  )
}
