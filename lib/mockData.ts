export type MarketStatus = "on-plan" | "at-risk" | "critical"

export interface Market {
  name: string
  code: string
  status: MarketStatus
}

export interface DemandDataPoint {
  week: string
  actual: number | null
  forecast: number
  lower: number
  upper: number
}

export interface DemandSeries {
  product: string
  data: DemandDataPoint[]
}

export interface KPI {
  label: string
  value: string | number
  trend?: string
  trendDirection?: "up" | "down" | "neutral"
  indicator?: "green" | "yellow" | "red"
}

export type AlertSeverity = "critical" | "warning" | "info"

export interface Alert {
  id: number
  message: string
  severity: AlertSeverity
}

export interface PlanningCycleTimeEntry {
  market: string
  days: number
}

export interface ChatHistoryMessage {
  role: "user" | "assistant"
  content: string
  citations?: string[]
  confidence?: number
  showChart?: boolean
}

const caffèLatteSeries: DemandDataPoint[] = [
  { week: "W1", actual: 4200, forecast: 4100, lower: 3900, upper: 4300 },
  { week: "W2", actual: 4350, forecast: 4250, lower: 4050, upper: 4450 },
  { week: "W3", actual: 4180, forecast: 4300, lower: 4100, upper: 4500 },
  { week: "W4", actual: 4520, forecast: 4400, lower: 4200, upper: 4600 },
  { week: "W5", actual: 4680, forecast: 4550, lower: 4350, upper: 4750 },
  { week: "W6", actual: 4720, forecast: 4700, lower: 4500, upper: 4900 },
  { week: "W7", actual: null, forecast: 4850, lower: 4650, upper: 5050 },
  { week: "W8", actual: null, forecast: 4920, lower: 4720, upper: 5120 },
  { week: "W9", actual: null, forecast: 5100, lower: 4900, upper: 5300 },
  { week: "W10", actual: null, forecast: 5050, lower: 4850, upper: 5250 },
  { week: "W11", actual: null, forecast: 5200, lower: 5000, upper: 5400 },
  { week: "W12", actual: null, forecast: 5350, lower: 5150, upper: 5550 },
]

export const markets: Market[] = [
  { name: "Switzerland", code: "CH", status: "on-plan" },
  { name: "Germany", code: "DE", status: "on-plan" },
  { name: "Austria", code: "AT", status: "at-risk" },
  { name: "Spain", code: "ES", status: "critical" },
  { name: "Italy", code: "IT", status: "at-risk" },
  { name: "France", code: "FR", status: "on-plan" },
  { name: "Netherlands", code: "NL", status: "at-risk" },
  { name: "UK", code: "UK", status: "on-plan" },
  { name: "USA", code: "US", status: "on-plan" },
  { name: "Brazil", code: "BR", status: "critical" },
  { name: "Chile", code: "CL", status: "at-risk" },
]

export const demandSeries: DemandSeries[] = [
  { product: "Caffè Latte", data: caffèLatteSeries },
  { product: "Kaltbach Cheese", data: caffèLatteSeries },
  { product: "Aktifit", data: caffèLatteSeries },
  { product: "Energy Milk", data: caffèLatteSeries },
  { product: "Mademoiselle Desserts", data: caffèLatteSeries },
]

export const kpis: KPI[] = [
  {
    label: "Forecast Accuracy",
    value: "87.4%",
    trend: "+2.1%",
    trendDirection: "up",
  },
  {
    label: "Waste Reduction YTD",
    value: "12.3%",
    trend: "+0.8%",
    trendDirection: "up",
  },
  {
    label: "Stockout Events",
    value: "4",
    trend: "-3",
    trendDirection: "up",
  },
  {
    label: "Demand Volatility",
    value: "Medium",
    indicator: "yellow",
  },
]

export const alerts: Alert[] = [
  {
    id: 1,
    message: "Spain — Caffè Latte demand surging +18%, supply gap risk",
    severity: "critical",
  },
  {
    id: 2,
    message: "Brazil — production line P3 capacity bottleneck",
    severity: "critical",
  },
  {
    id: 3,
    message: "Germany — Kaltbach inventory 23 days, above target",
    severity: "warning",
  },
  {
    id: 4,
    message: "USA — Q3 promotional planning needs alignment",
    severity: "info",
  },
]

export const planningCycleTime: PlanningCycleTimeEntry[] = [
  { market: "CH", days: 4 },
  { market: "AT", days: 5 },
  { market: "DE", days: 6 },
  { market: "FR", days: 7 },
  { market: "ES", days: 9 },
  { market: "BR", days: 12 },
  { market: "US", days: 14 },
]

export const initialChatHistory: ChatHistoryMessage[] = [
  {
    role: "user",
    content: "Compare Kaltbach sales DE vs AT last 90 days",
  },
  {
    role: "assistant",
    content:
      "In the last 90 days, Germany (DE) recorded 2,340 tonnes of Kaltbach cheese sales compared to Austria's (AT) 1,890 tonnes. Germany is outperforming by approximately 23.8%. Both markets show stable quarter-over-quarter growth, with DE driven by retail expansion and AT by foodservice contracts.",
    citations: ["SAP S/4 Sales Module", "Infor M3 SC Planning", "Q2 Sales Data"],
    confidence: 94,
    showChart: true,
  },
  {
    role: "user",
    content: "Why is Spain Caffè Latte demand surging?",
  },
  {
    role: "assistant",
    content:
      "Spain Caffè Latte demand has increased 18% week-over-week due to a combination of factors: (1) a successful summer promotional campaign launched June 15th, (2) expanded distribution to 340 new retail locations, and (3) unseasonably warm weather driving cold beverage consumption. Current supply may not meet projected demand through W9.",
    citations: ["Trade Promotion Module", "Nielsen POS Data", "Weather API"],
    confidence: 92,
  },
]
