import { LeftSidebar } from "@/components/emmi/left-sidebar"
import { TopBar } from "@/components/emmi/top-bar"
import { DemandForecasting } from "@/components/emmi/demand-forecasting"
import { SOPCockpit } from "@/components/emmi/sop-cockpit"
import { PlanningCopilot } from "@/components/emmi/planning-copilot"

export default function Home() {
  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden">
      <LeftSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        
        <main className="flex-1 flex min-h-0">
          <div className="flex-1 flex min-w-0">
            <DemandForecasting />
            <SOPCockpit />
          </div>
          <PlanningCopilot />
        </main>
      </div>
    </div>
  )
}
