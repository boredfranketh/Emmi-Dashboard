"use client"

import { ChevronDown, Shield, User } from "lucide-react"

export function TopBar() {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <span className="text-foreground font-semibold text-sm">
          EMMI Planning Intelligence
        </span>
      </div>

      <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-sm text-muted-foreground hover:bg-secondary transition-colors">
        <Globe2Icon className="w-4 h-4" />
        <span>All Markets</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#22C55E]/10 border border-[#22C55E]/20">
          <Shield className="w-3.5 h-3.5 text-[#22C55E]" />
          <span className="text-[11px] font-medium text-[#22C55E]">
            GxP Validated · v1.0
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#2A2A34] flex items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  )
}

function Globe2Icon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}
