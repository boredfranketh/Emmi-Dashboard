"use client"

import { useState } from "react"
import { StatusDot } from "./status-dot"
import { SeverityPill } from "./severity-pill"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts"
import { alerts, markets, planningCycleTime } from "@/lib/mockData"

interface SOPCockpitProps {
  onInvestigate?: (alertMessage: string) => void
}

export function SOPCockpit({ onInvestigate }: SOPCockpitProps) {
  const [selectedMarketCode, setSelectedMarketCode] = useState<string | null>(
    null
  )

  const selectedMarket = selectedMarketCode
    ? markets.find((market) => market.code === selectedMarketCode)
    : null

  const filteredAlerts = selectedMarketCode
    ? alerts.filter((alert) => alert.market === selectedMarketCode)
    : alerts

  const handleMarketClick = (code: string) => {
    setSelectedMarketCode((current) => (current === code ? null : code))
  }

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
            <button
              key={market.code}
              type="button"
              onClick={() => handleMarketClick(market.code)}
              className={cn(
                "relative isolate box-border flex aspect-square min-h-16 w-full min-w-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border bg-[#0F0F12] transition-colors",
                selectedMarketCode === market.code
                  ? "border-[#5BC5E8] ring-1 ring-[#5BC5E8]/50"
                  : "border-border hover:border-muted-foreground"
              )}
            >
              <StatusDot
                status={market.status}
                className="absolute right-2 top-2"
              />
              <span className="block text-center text-base font-bold leading-none tracking-wide text-white">
                {market.code}
              </span>
            </button>
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

      {selectedMarket && (
        <div className="bg-[#1A1A20] rounded-md border border-[#5BC5E8]/40 p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base font-bold text-white">
              {selectedMarket.code}
            </span>
            <span className="text-sm text-muted-foreground">
              {selectedMarket.name}
            </span>
            <StatusDot status={selectedMarket.status} />
          </div>
          <p className="text-sm text-foreground leading-relaxed mb-4">
            {selectedMarket.summary}
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-md bg-[#0F0F12] border border-border p-3">
              <div className="text-muted-foreground mb-1">Production Sites</div>
              <div className="text-sm font-semibold text-foreground">
                {selectedMarket.productionSites}
              </div>
            </div>
            <div className="rounded-md bg-[#0F0F12] border border-border p-3">
              <div className="text-muted-foreground mb-1">Planning Cycle</div>
              <div className="text-sm font-semibold text-foreground">
                {selectedMarket.planningCycleDays} days
              </div>
            </div>
            <div className="rounded-md bg-[#0F0F12] border border-border p-3">
              <div className="text-muted-foreground mb-1">Forecast Accuracy</div>
              <div className="text-sm font-semibold text-foreground">
                {selectedMarket.forecastAccuracy}
              </div>
            </div>
            <div className="rounded-md bg-[#0F0F12] border border-border p-3">
              <div className="text-muted-foreground mb-1">Inventory Days</div>
              <div className="text-sm font-semibold text-foreground">
                {selectedMarket.inventoryDays ?? "—"}
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs">
            <span className="text-muted-foreground">Top products: </span>
            <span className="text-foreground">
              {selectedMarket.topProducts.join(", ")}
            </span>
          </div>
        </div>
      )}

      <div className="bg-[#1A1A20] rounded-md border border-border p-4 mb-6">
        <div className="text-xs text-muted-foreground mb-3">
          Critical Alerts
          {selectedMarketCode && (
            <span className="text-[#5BC5E8]"> — {selectedMarketCode}</span>
          )}
        </div>
        <div className="space-y-2">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
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
                <button
                  type="button"
                  onClick={() => onInvestigate?.(alert.message)}
                  className="text-[11px] text-[#5BC5E8] hover:underline whitespace-nowrap pt-0.5 shrink-0"
                >
                  Investigate
                </button>
              </div>
            ))
          ) : (
            <div className="py-6 px-3 text-sm text-muted-foreground text-center bg-[#0F0F12] rounded-md">
              No alerts for {selectedMarketCode}. Market is clear.
            </div>
          )}
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
              <Bar dataKey="days" radius={[0, 4, 4, 0]} barSize={12}>
                {planningCycleTime.map((entry) => (
                  <Cell
                    key={entry.market}
                    fill={
                      entry.market === selectedMarketCode ? "#C8102E" : "#5BC5E8"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
