"use client";

import {
  BentoBox,
  BentoGrid,
  BentoModal,
  DefaultBentoCard,
  DefaultBentoModal,
  BentoItem,
} from "@/layouts/bento-box-layout";

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
    description: "Comprehensive design tokens and component library for consistent UI development.",
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
    description: "Comprehensive user interviews and usability testing insights.",
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
    description: "Application performance monitoring and optimization recommendations.",
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
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{item.icon}</div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {item.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-white/80 text-sm flex-1">
              {item.description}
            </p>
            <div className="mt-4 flex gap-2">
              {item.team.slice(0, 3).map((member: string, i: number) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs"
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
            <div className="flex items-center justify-between mb-8">
              <div className="text-6xl">{item.icon}</div>
              <div className="text-right">
                <div className="text-sm bg-white/20 px-3 py-1 rounded-full mb-2">
                  {item.category}
                </div>
                <div className="text-xs text-white/60">
                  Status: {item.status}
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-6">
              {item.title}
            </h1>

            <p className="text-white/90 text-lg mb-8">
              {item.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Team Members</h3>
                <div className="flex flex-wrap gap-2">
                  {item.team.map((member: string, index: number) => (
                    <span
                      key={index}
                      className="bg-white/20 px-3 py-1 rounded-full text-sm"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Project Status</h3>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.status === "active"
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
              <button className="bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                View Details
              </button>
              <button className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                Edit Project
              </button>
            </div>
          </div>
        )}
      </BentoModal>
    </BentoBox>
  );
}