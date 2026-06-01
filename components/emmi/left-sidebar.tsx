"use client"

import {
  LayoutDashboard,
  Globe2,
  Package,
  CalendarClock,
  AlertTriangle,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Globe2, label: "Markets", active: false },
  { icon: Package, label: "Products", active: false },
  { icon: CalendarClock, label: "Planning", active: false },
  { icon: AlertTriangle, label: "Alerts", active: false },
  { icon: Settings, label: "Settings", active: false },
]

export function LeftSidebar() {
  return (
    <aside className="w-[60px] bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-2">
      <div className="w-8 h-8 bg-[#C8102E] rounded-md flex items-center justify-center mb-4">
        <span className="text-white font-bold text-sm">E</span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={cn(
              "w-10 h-10 rounded-md flex items-center justify-center transition-colors",
              active
                ? "bg-sidebar-accent text-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
            )}
            title={label}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </nav>
    </aside>
  )
}
