"use client";

import {
  BentoBox,
  BentoGrid,
  BentoItem,
  BentoModal,
  DefaultBentoCard,
  DefaultBentoModal,
} from "@/components/layout/bento-box-layout";

// Define your data type
interface ProjectItem {
  title: string;
  description: string;
  category: string;
  status: "active" | "completed" | "planning";
  team: string[];
}

// Sample data
const projects: BentoItem<ProjectItem>[] = [
  {
    id: "1",
    title: "Design System",
    description:
      "Comprehensive design tokens and component library for consistent UI development.",
    icon: "🎨",
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    size: "large",
    category: "design",
    status: "active",
    team: ["Alice", "Bob", "Charlie"],
  },
  {
    id: "2",
    title: "Analytics Dashboard",
    description: "Real-time user behavior tracking and insights.",
    icon: "📊",
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    size: "medium",
    category: "analytics",
    status: "active",
    team: ["David", "Eve"],
  },
  {
    id: "3",
    title: "Code Review Tool",
    description: "Automated code quality checks and peer review process.",
    icon: "🔍",
    color: "bg-gradient-to-br from-green-500 to-emerald-500",
    size: "small",
    category: "development",
    status: "completed",
    team: ["Frank", "Grace"],
  },
  {
    id: "4",
    title: "Marketing Campaign",
    description: "Multi-channel campaign management and performance tracking.",
    icon: "📈",
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    size: "medium",
    category: "marketing",
    status: "planning",
    team: ["Henry", "Ivy", "Jack"],
  },
  {
    id: "5",
    title: "User Research",
    description:
      "Comprehensive user interviews and usability testing insights.",
    icon: "👥",
    color: "bg-gradient-to-br from-indigo-500 to-purple-500",
    size: "small",
    category: "design",
    status: "active",
    team: ["Kate", "Liam"],
  },
  {
    id: "6",
    title: "Performance Monitor",
    description:
      "Application performance monitoring and optimization recommendations.",
    icon: "⚡",
    color: "bg-gradient-to-br from-yellow-500 to-orange-500",
    size: "small",
    category: "development",
    status: "active",
    team: ["Maya", "Noah"],
  },
];

export default function BentoBoxExample() {
  return (
    <BentoBox<ProjectItem>>
      {/* Grid with default cards */}
      <BentoGrid<ProjectItem> items={projects} columns={4}>
        {(item) => <DefaultBentoCard<ProjectItem> item={item} />}
      </BentoGrid>

      {/* Modal with default content */}
      <BentoModal<ProjectItem>>
        {(item) => (
          <DefaultBentoModal<ProjectItem>
            item={item}
            features={[
              "Advanced analytics",
              "Real-time monitoring",
              "Custom dashboards",
              "Team collaboration",
            ]}
            benefits={[
              "Increased efficiency",
              "Better insights",
              "Cost savings",
              "Improved workflow",
            ]}
            integrations={[
              "API access",
              "Webhook support",
              "Third-party tools",
              "Slack integration",
            ]}
          />
        )}
      </BentoModal>
    </BentoBox>
  );
}

// Example of custom implementation
export function CustomBentoExample() {
  return (
    <BentoBox<ProjectItem>>
      <BentoGrid<ProjectItem> items={projects} columns={3}>
        {(item, index) => (
          <div className="flex h-full flex-col p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-3xl">{item.icon}</div>
              <span className="rounded-full bg-white/20 px-2 py-1 text-xs">
                {item.category}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              {item.title}
            </h3>
            <p className="flex-1 text-sm text-white/80">{item.description}</p>
            <div className="mt-4 flex gap-2">
              {item.team.slice(0, 3).map((member: string, i: number) => (
                <div
                  key={i}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs"
                >
                  {member[0]}
                </div>
              ))}
            </div>
          </div>
        )}
      </BentoGrid>

      <BentoModal<ProjectItem>>
        {(item) => (
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <div className="text-6xl">{item.icon}</div>
              <div className="text-right">
                <div className="mb-2 rounded-full bg-white/20 px-3 py-1 text-sm">
                  {item.category}
                </div>
                <div className="text-xs text-white/60">
                  Status: {item.status}
                </div>
              </div>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-white">{item.title}</h1>

            <p className="mb-8 text-lg text-white/90">{item.description}</p>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-6">
                <h3 className="mb-4 font-semibold text-white">Team Members</h3>
                <div className="flex flex-wrap gap-2">
                  {item.team.map((member: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-white/20 px-3 py-1 text-sm"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-white/10 p-6">
                <h3 className="mb-4 font-semibold text-white">
                  Project Status
                </h3>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${item.status === "active"
                        ? "bg-green-400"
                        : item.status === "completed"
                          ? "bg-blue-400"
                          : "bg-yellow-400"
                      }`}
                  />
                  <span className="text-white capitalize">{item.status}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-100">
                View Details
              </button>
              <button className="rounded-xl bg-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/30">
                Edit Project
              </button>
            </div>
          </div>
        )}
      </BentoModal>
    </BentoBox>
  );
}
