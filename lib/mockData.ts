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
  unit: string
  markets: string[]
  data: DemandDataPoint[]
  kpis: KPI[]
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

const kaltbachSeries: DemandDataPoint[] = [
  { week: "W1", actual: 2180, forecast: 2120, lower: 2000, upper: 2240 },
  { week: "W2", actual: 2240, forecast: 2180, lower: 2060, upper: 2300 },
  { week: "W3", actual: 2190, forecast: 2210, lower: 2090, upper: 2330 },
  { week: "W4", actual: 2310, forecast: 2260, lower: 2140, upper: 2380 },
  { week: "W5", actual: 2380, forecast: 2320, lower: 2200, upper: 2440 },
  { week: "W6", actual: 2410, forecast: 2390, lower: 2270, upper: 2510 },
  { week: "W7", actual: null, forecast: 2450, lower: 2330, upper: 2570 },
  { week: "W8", actual: null, forecast: 2480, lower: 2360, upper: 2600 },
  { week: "W9", actual: null, forecast: 2520, lower: 2400, upper: 2640 },
  { week: "W10", actual: null, forecast: 2500, lower: 2380, upper: 2620 },
  { week: "W11", actual: null, forecast: 2550, lower: 2430, upper: 2670 },
  { week: "W12", actual: null, forecast: 2590, lower: 2470, upper: 2710 },
]

const aktifitSeries: DemandDataPoint[] = [
  { week: "W1", actual: 980, forecast: 960, lower: 900, upper: 1020 },
  { week: "W2", actual: 1010, forecast: 990, lower: 930, upper: 1050 },
  { week: "W3", actual: 970, forecast: 1000, lower: 940, upper: 1060 },
  { week: "W4", actual: 1040, forecast: 1020, lower: 960, upper: 1080 },
  { week: "W5", actual: 1070, forecast: 1050, lower: 990, upper: 1110 },
  { week: "W6", actual: 1085, forecast: 1075, lower: 1015, upper: 1135 },
  { week: "W7", actual: null, forecast: 1100, lower: 1040, upper: 1160 },
  { week: "W8", actual: null, forecast: 1120, lower: 1060, upper: 1180 },
  { week: "W9", actual: null, forecast: 1145, lower: 1085, upper: 1205 },
  { week: "W10", actual: null, forecast: 1135, lower: 1075, upper: 1195 },
  { week: "W11", actual: null, forecast: 1160, lower: 1100, upper: 1220 },
  { week: "W12", actual: null, forecast: 1185, lower: 1125, upper: 1245 },
]

const energyMilkSeries: DemandDataPoint[] = [
  { week: "W1", actual: 3120, forecast: 3050, lower: 2900, upper: 3200 },
  { week: "W2", actual: 3180, forecast: 3120, lower: 2970, upper: 3270 },
  { week: "W3", actual: 3090, forecast: 3150, lower: 3000, upper: 3300 },
  { week: "W4", actual: 3250, forecast: 3200, lower: 3050, upper: 3350 },
  { week: "W5", actual: 3310, forecast: 3280, lower: 3130, upper: 3430 },
  { week: "W6", actual: 3340, forecast: 3320, lower: 3170, upper: 3470 },
  { week: "W7", actual: null, forecast: 3380, lower: 3230, upper: 3530 },
  { week: "W8", actual: null, forecast: 3410, lower: 3260, upper: 3560 },
  { week: "W9", actual: null, forecast: 3480, lower: 3330, upper: 3630 },
  { week: "W10", actual: null, forecast: 3450, lower: 3300, upper: 3600 },
  { week: "W11", actual: null, forecast: 3520, lower: 3370, upper: 3670 },
  { week: "W12", actual: null, forecast: 3580, lower: 3430, upper: 3730 },
]

const mademoiselleSeries: DemandDataPoint[] = [
  { week: "W1", actual: 1540, forecast: 1480, lower: 1380, upper: 1580 },
  { week: "W2", actual: 1490, forecast: 1520, lower: 1420, upper: 1620 },
  { week: "W3", actual: 1580, forecast: 1550, lower: 1450, upper: 1650 },
  { week: "W4", actual: 1620, forecast: 1590, lower: 1490, upper: 1690 },
  { week: "W5", actual: 1710, forecast: 1640, lower: 1540, upper: 1740 },
  { week: "W6", actual: 1680, forecast: 1700, lower: 1600, upper: 1800 },
  { week: "W7", actual: null, forecast: 1750, lower: 1650, upper: 1850 },
  { week: "W8", actual: null, forecast: 1780, lower: 1680, upper: 1880 },
  { week: "W9", actual: null, forecast: 1820, lower: 1720, upper: 1920 },
  { week: "W10", actual: null, forecast: 1790, lower: 1690, upper: 1890 },
  { week: "W11", actual: null, forecast: 1840, lower: 1740, upper: 1940 },
  { week: "W12", actual: null, forecast: 1880, lower: 1780, upper: 1980 },
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
  {
    product: "Caffè Latte",
    unit: "units in thousands",
    markets: ["CH", "DE", "AT", "ES", "IT", "FR"],
    data: caffèLatteSeries,
    kpis: [
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
    ],
  },
  {
    product: "Kaltbach Cheese",
    unit: "tonnes",
    markets: ["CH", "DE", "AT", "FR", "NL", "UK"],
    data: kaltbachSeries,
    kpis: [
      {
        label: "Forecast Accuracy",
        value: "91.8%",
        trend: "+1.4%",
        trendDirection: "up",
      },
      {
        label: "Waste Reduction YTD",
        value: "9.6%",
        trend: "+1.2%",
        trendDirection: "up",
      },
      {
        label: "Stockout Events",
        value: "1",
        trend: "-2",
        trendDirection: "up",
      },
      {
        label: "Demand Volatility",
        value: "Low",
        indicator: "green",
      },
    ],
  },
  {
    product: "Aktifit",
    unit: "cases",
    markets: ["CH", "DE", "AT", "NL"],
    data: aktifitSeries,
    kpis: [
      {
        label: "Forecast Accuracy",
        value: "93.2%",
        trend: "+0.9%",
        trendDirection: "up",
      },
      {
        label: "Waste Reduction YTD",
        value: "7.4%",
        trend: "+1.5%",
        trendDirection: "up",
      },
      {
        label: "Stockout Events",
        value: "0",
        trend: "-1",
        trendDirection: "up",
      },
      {
        label: "Demand Volatility",
        value: "Low",
        indicator: "green",
      },
    ],
  },
  {
    product: "Energy Milk",
    unit: "litres in thousands",
    markets: ["CH", "DE", "FR", "US", "BR"],
    data: energyMilkSeries,
    kpis: [
      {
        label: "Forecast Accuracy",
        value: "85.1%",
        trend: "+1.8%",
        trendDirection: "up",
      },
      {
        label: "Waste Reduction YTD",
        value: "11.8%",
        trend: "+0.5%",
        trendDirection: "up",
      },
      {
        label: "Stockout Events",
        value: "3",
        trend: "-1",
        trendDirection: "up",
      },
      {
        label: "Demand Volatility",
        value: "Medium",
        indicator: "yellow",
      },
    ],
  },
  {
    product: "Mademoiselle Desserts",
    unit: "units in thousands",
    markets: ["FR", "IT", "ES", "UK", "US"],
    data: mademoiselleSeries,
    kpis: [
      {
        label: "Forecast Accuracy",
        value: "82.7%",
        trend: "+0.6%",
        trendDirection: "up",
      },
      {
        label: "Waste Reduction YTD",
        value: "14.2%",
        trend: "+0.3%",
        trendDirection: "up",
      },
      {
        label: "Stockout Events",
        value: "6",
        trend: "+1",
        trendDirection: "down",
      },
      {
        label: "Demand Volatility",
        value: "High",
        indicator: "red",
      },
    ],
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
