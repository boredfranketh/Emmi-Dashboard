"use client"

import { useRef } from "react"
import { LeftSidebar } from "@/components/emmi/left-sidebar"
import { TopBar } from "@/components/emmi/top-bar"
import { DemandForecasting } from "@/components/emmi/demand-forecasting"
import { SOPCockpit } from "@/components/emmi/sop-cockpit"
import {
  PlanningCopilot,
  type PlanningCopilotHandle,
} from "@/components/emmi/planning-copilot"

export function DashboardShell() {
  const copilotRef = useRef<PlanningCopilotHandle>(null)

  const handleInvestigate = (alertMessage: string) => {
    document
      .getElementById("planning-copilot")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" })

    copilotRef.current?.sendMessage(`Investigate: ${alertMessage}`)
  }

  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden">
      <LeftSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 flex min-h-0">
          <div className="flex-1 flex min-w-0">
            <DemandForecasting />
            <SOPCockpit onInvestigate={handleInvestigate} />
          </div>
          <PlanningCopilot ref={copilotRef} />
        </main>
      </div>
    </div>
  )
}
