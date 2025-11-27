"use client"

import * as React from "react"
import { Cell, Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "ADHD symptoms persistence from childhood to adulthood"

const chartData = [
    { name: "persist", label: "Persist into Adulthood", value: 60, fill: "var(--color-persist)" },
    { name: "remit", label: "Remit by Adulthood", value: 40, fill: "var(--color-remit)" },
]

const chartConfig = {
    persist: {
        label: "Persist into Adulthood",
        color: "hsl(221, 83%, 53%)",
    },
    remit: {
        label: "Remit by Adulthood",
        color: "hsl(221, 83%, 75%)",
    },
} satisfies ChartConfig

export function SymptomPersistenceChart() {
    const id = "symptom-persistence"
    const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined)

    return (
        <Card data-chart={id} className="w-full">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader>
                <CardTitle>ADHD Persistence Into Adulthood</CardTitle>
                <CardDescription>Percentage of individuals with childhood ADHD diagnosis</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel formatter={(value) => `${value}%`} />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(undefined)}
                            activeShape={({
                                outerRadius = 0,
                                ...props
                            }: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 25}
                                        innerRadius={outerRadius + 12}
                                    />
                                </g>
                            )}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        const activeData = activeIndex !== undefined ? chartData[activeIndex] : null
                                        const displayValue = activeData ? activeData.value : chartData[0].value
                                        const displayLabel = activeData ? activeData.label : chartData[0].label

                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {displayValue}%
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground text-sm"
                                                >
                                                    {displayLabel}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
