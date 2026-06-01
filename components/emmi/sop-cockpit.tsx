"use client"

import { StatusDot } from "./status-dot"
import { SeverityPill } from "./severity-pill"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { alerts, markets, planningCycleTime } from "@/lib/mockData"

export function SOPCockpit() {
  return (
    <section className="flex-1 min-w-[280px] p-6 border-l border-border overflow-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">S&OP Cockpit</h2>
        <p className="text-sm text-muted-foreground">
          Cross-market planning health, 73 production sites
        </p>
      </div>

      <div className="bg-[#1A1A20] rounded-md border border-border p-4 mb-6">
        <div className="text-xs text-muted-foreground mb-4">
          Regional Status — {markets.length} Countries
        </div>
        <div className="grid w-full grid-cols-4 gap-3">
          {markets.map((market) => (
            <div
              key={market.code}
              className="relative isolate box-border flex aspect-square min-h-16 w-full min-w-0 items-center justify-center overflow-hidden rounded-md border border-border bg-[#0F0F12]"
            >
              <StatusDot
                status={market.status}
                className="absolute right-2 top-2"
              />
              <span className="block text-center text-base font-bold leading-none tracking-wide text-white">
                {market.code}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <StatusDot status="on-plan" />
            <span>On Plan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <StatusDot status="at-risk" />
            <span>At Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <StatusDot status="critical" />
            <span>Critical</span>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A20] rounded-md border border-border p-4 mb-6">
        <div className="text-xs text-muted-foreground mb-3">
          Critical Alerts
        </div>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start justify-between gap-4 py-3 px-3 bg-[#0F0F12] rounded-md"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="pt-0.5 shrink-0">
                  <SeverityPill severity={alert.severity} />
                </div>
                <span className="text-sm text-foreground leading-relaxed">
                  {alert.message}
                </span>
              </div>
              <button className="text-[11px] text-[#5BC5E8] hover:underline whitespace-nowrap pt-0.5 shrink-0">
                Investigate
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-md border border-border p-4">
        <div className="text-xs text-muted-foreground mb-4">
          Planning Cycle Time by Market (days)
        </div>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={planningCycleTime} layout="vertical">
              <XAxis
                type="number"
                tick={{ fill: "#B0BECF", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 16]}
              />
              <YAxis
                type="category"
                dataKey="market"
                tick={{ fill: "#B0BECF", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A20",
                  border: "1px solid #2A2A34",
                  borderRadius: "6px",
                  fontSize: 11,
                }}
                cursor={{ fill: "#2A2A34" }}
              />
              <Bar
                dataKey="days"
                fill="#5BC5E8"
                radius={[0, 4, 4, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
