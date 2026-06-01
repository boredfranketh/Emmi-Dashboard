"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts"
import { KPITile } from "./kpi-tile"
import { cn } from "@/lib/utils"
import { demandSeries } from "@/lib/mockData"
import type { DemandDataPoint } from "@/lib/mockData"

const defaultProduct = "Caffè Latte"

function getChartDomain(data: DemandDataPoint[]): [number, number] {
  const values = data.flatMap((point) =>
    [point.actual, point.forecast, point.lower, point.upper].filter(
      (value): value is number => value !== null
    )
  )
  const min = Math.min(...values)
  const max = Math.max(...values)
  const padding = Math.round((max - min) * 0.1)

  return [min - padding, max + padding]
}

export function DemandForecasting() {
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct)
  const selectedSeries =
    demandSeries.find((series) => series.product === selectedProduct) ??
    demandSeries[0]
  const chartData = selectedSeries.data
  const chartDomain = getChartDomain(chartData)

  return (
    <section className="flex-1 p-6 overflow-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Demand Forecasting
        </h2>
        <p className="text-sm text-muted-foreground">
          Next 12 weeks across {selectedSeries.markets.join(", ")}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {demandSeries.map((series) => (
          <button
            key={series.product}
            onClick={() => setSelectedProduct(series.product)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors",
              selectedProduct === series.product
                ? "bg-[#C8102E] border-[#C8102E] text-white"
                : "border-border text-muted-foreground hover:border-muted-foreground"
            )}
          >
            {series.product}
          </button>
        ))}
      </div>

      <div className="bg-[#1A1A20] rounded-md border border-border p-4 mb-6">
        <div className="text-xs text-muted-foreground mb-4">
          {selectedProduct} — Actual vs Forecast ({selectedSeries.unit})
        </div>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2A2A34"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                tick={{ fill: "#B0BECF", fontSize: 11 }}
                axisLine={{ stroke: "#2A2A34" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#B0BECF", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={chartDomain}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A20",
                  border: "1px solid #2A2A34",
                  borderRadius: "6px",
                  fontSize: 12,
                }}
                labelStyle={{ color: "#B0BECF" }}
              />
              <Area
                type="monotone"
                dataKey="upper"
                stroke="none"
                fill="#5BC5E8"
                fillOpacity={0.15}
                baseValue="dataMin"
              />
              <Area
                type="monotone"
                dataKey="lower"
                stroke="none"
                fill="#0F0F12"
                fillOpacity={1}
                baseValue="dataMin"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#FFFFFF"
                strokeWidth={2}
                dot={{ fill: "#FFFFFF", strokeWidth: 0, r: 3 }}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#5BC5E8"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={{ fill: "#5BC5E8", strokeWidth: 0, r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-white" />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t-2 border-dashed border-[#5BC5E8]" />
            <span className="text-muted-foreground">Forecast</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-[#5BC5E8]/20 rounded-sm" />
            <span className="text-muted-foreground">Confidence Interval</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {selectedSeries.kpis.map((kpi) => (
          <KPITile
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            trendDirection={kpi.trendDirection}
            indicator={kpi.indicator}
          />
        ))}
      </div>
    </section>
  )
}
