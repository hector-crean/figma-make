"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { type ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "ADHD symptoms over time showing hyperactivity/impulsivity and inattention trends"

// Sample data showing symptom severity over age
// Hyperactivity/impulsivity decreases with age, inattention remains relatively stable
const chartData = [
    { age: "5", hyperactivity: 85, inattention: 60 },
    { age: "8", hyperactivity: 75, inattention: 58 },
    { age: "12", hyperactivity: 65, inattention: 57 },
    { age: "16", hyperactivity: 55, inattention: 56 },
    { age: "20", hyperactivity: 45, inattention: 55 },
    { age: "25", hyperactivity: 38, inattention: 54 },
    { age: "30", hyperactivity: 32, inattention: 53 },
    { age: "35", hyperactivity: 28, inattention: 52 },
]

const chartConfig = {
    hyperactivity: {
        label: "Hyperactivity/Impulsivity",
        color: "#8ed973", // Green color from Figma
    },
    inattention: {
        label: "Inattention",
        color: "#156082", // Blue color from Figma
    },
} satisfies ChartConfig

export function SymptomsOverTimeChart() {
    const id = "symptoms-over-time"

    return (
        <div className="w-full">
            <ChartStyle id={id} config={chartConfig} />
            <ChartContainer
                id={id}
                config={chartConfig}
                className="h-[300px] w-full"
            >
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                        dataKey="age"
                        label={{ value: "Age", position: "insideBottom", offset: -5 }}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                        label={{ value: "Symptom severity", angle: -90, position: "insideLeft" }}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <ChartTooltip
                        content={<ChartTooltipContent />}
                    />
                    <Line
                        type="monotone"
                        dataKey="hyperactivity"
                        stroke="var(--color-hyperactivity)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-hyperactivity)", r: 4 }}
                        name="hyperactivity"
                    />
                    <Line
                        type="monotone"
                        dataKey="inattention"
                        stroke="var(--color-inattention)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-inattention)", r: 4 }}
                        name="inattention"
                    />
                </LineChart>
            </ChartContainer>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#8ed973]" />
                    <span className="font-bold text-[#8ed973]">Hyperactivity/Impulsivity</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#156082]" />
                    <span className="font-bold text-[#156082]">Inattention</span>
                </div>
            </div>
        </div>
    )
}

