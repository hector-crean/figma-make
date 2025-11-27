import { Baby, Users } from "lucide-react";

interface StatCardProps {
    title: string;
    population: string;
    percentage: string;
    color: "blue" | "purple";
}

export function StatCard({ title, population, percentage, color }: StatCardProps) {
    const colorClasses = {
        blue: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            icon: "bg-blue-500",
            text: "text-blue-900",
            accent: "text-blue-600",
        },
        purple: {
            bg: "bg-purple-50",
            border: "border-purple-200",
            icon: "bg-purple-500",
            text: "text-purple-900",
            accent: "text-purple-600",
        },
    };

    const styles = colorClasses[color];
    const Icon = title === "Adults" ? Users : Baby;

    return (
        <div className={`${styles.bg} ${styles.border} border-2 rounded-2xl p-6 transition-transform hover:scale-105`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`${styles.icon} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={styles.text}>{title}</h3>
            </div>
            <div className="space-y-2">
                <div>
                    <p className="text-gray-600">Population</p>
                    <p className={`${styles.text} text-3xl`}>{population}</p>
                </div>
                <div>
                    <p className="text-gray-600">Percentage</p>
                    <p className={`${styles.accent} text-2xl`}>{percentage}</p>
                </div>
            </div>
        </div>
    );
}
