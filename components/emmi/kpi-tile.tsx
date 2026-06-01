"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface KPITileProps {
  label: string
  value: string | number
  trend?: string
  trendDirection?: "up" | "down" | "neutral"
  indicator?: "green" | "yellow" | "red"
  className?: string
}

export function KPITile({
  label,
  value,
  trend,
  trendDirection = "neutral",
  indicator,
  className,
}: KPITileProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-card border border-border p-4 flex flex-col gap-1",
        className
      )}
    >
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        {indicator && (
          <span
            className={cn("w-2.5 h-2.5 rounded-full", {
              "bg-[#22C55E]": indicator === "green",
              "bg-[#F59E0B]": indicator === "yellow",
              "bg-[#C8102E]": indicator === "red",
            })}
          />
        )}
      </div>
      {trend && (
        <div
          className={cn("flex items-center gap-1 text-xs font-medium", {
            "text-[#22C55E]": trendDirection === "up",
            "text-[#C8102E]": trendDirection === "down",
            "text-muted-foreground": trendDirection === "neutral",
          })}
        >
          {trendDirection === "up" && <TrendingUp className="w-3 h-3" />}
          {trendDirection === "down" && <TrendingDown className="w-3 h-3" />}
          {trendDirection === "neutral" && <Minus className="w-3 h-3" />}
          <span>{trend}</span>
        </div>
      )}
    </div>
  )
}
