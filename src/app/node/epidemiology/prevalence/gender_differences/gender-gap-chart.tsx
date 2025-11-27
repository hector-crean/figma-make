"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { type ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "Gender gap in ADHD prevalence across age groups"

// Sample data - adjust based on actual research data
const chartData = [
    { age: "5", males: 8, females: 2 },
    { age: "10", males: 12, females: 3 },
    { age: "15", males: 14, females: 5 },
    { age: "20", males: 6, females: 4 },
    { age: "25", males: 5, females: 4 },
    { age: "30", males: 4.5, females: 4 },
]

const chartConfig = {
    males: {
        label: "Males",
        color: "hsl(210, 100%, 20%)", // Dark blue (#0b3041)
    },
    females: {
        label: "Females",
        color: "hsl(320, 60%, 70%)", // Pink (#d86ecc)
    },
} satisfies ChartConfig

export function GenderGapChart() {
    const id = "gender-gap"

    return (
        <div className="w-full" data-chart={id}>
            <ChartStyle id={id} config={chartConfig} />
            <div className="mb-2">
                <h4 className="text-sm font-bold text-slate-800">Gender Gap*</h4>
                <p className="text-xs text-slate-600 mt-1">3x to 16x in childhood [1]</p>
            </div>
            <ChartContainer
                id={id}
                config={chartConfig}
                className="h-[188px] w-full"
            >
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="age"
                        label={{ value: "Age", position: "insideBottom", offset: -5 }}
                        stroke="#49576f"
                        fontSize={12}
                    />
                    <YAxis
                        label={{ value: "Prevalence", angle: -90, position: "insideLeft" }}
                        stroke="#49576f"
                        fontSize={12}
                    />
                    <ChartTooltip
                        content={<ChartTooltipContent />}
                    />
                    <Line
                        type="monotone"
                        dataKey="males"
                        stroke="var(--color-males)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-males)", r: 4 }}
                        name="Males"
                    />
                    <Line
                        type="monotone"
                        dataKey="females"
                        stroke="var(--color-females)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-females)", r: 4 }}
                        name="Females"
                    />
                </LineChart>
            </ChartContainer>
            <div className="flex justify-end gap-4 mt-2 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-males)" }}></div>
                    <span className="text-slate-700">Males</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-females)" }}></div>
                    <span className="text-slate-700">Females</span>
                </div>
            </div>
        </div>
    )
}

