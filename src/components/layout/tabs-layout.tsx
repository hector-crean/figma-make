"use client";

import { LucideIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { ReactNode, useState } from "react";

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon | string;
  content: ReactNode;
}

interface TabsLayoutProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export default function TabsLayout({ tabs, defaultTabId, className = "" }: TabsLayoutProps) {
  const [selectedTab, setSelectedTab] = useState<TabItem>(
    tabs.find(t => t.id === defaultTabId) || tabs[0]
  );

  const renderIcon = (icon: LucideIcon | string | undefined) => {
    if (!icon) return null;
    if (typeof icon === "string") {
      return <span>{icon}</span>;
    }
    const IconComponent = icon as LucideIcon;
    return <IconComponent size={16} />;
  };

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className="flex gap-2 mt-6 mb-8 border-b-2 border-slate-200">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            onClick={() => setSelectedTab(tab)}
            initial={false}
            animate={{
              backgroundColor: tab.id === selectedTab.id ? "#3b82f6" : "#f1f5f9",
              color: tab.id === selectedTab.id ? "#ffffff" : "#475569",
            }}
            whileHover={{
              backgroundColor: tab.id === selectedTab.id ? "#3b82f6" : "#e2e8f0",
            }}
            className={`
              relative flex items-center gap-2 px-4 py-3 rounded-t-lg text-sm transition-all cursor-pointer
              ${tab.id === selectedTab.id
                ? "bg-blue-500 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }
            `}
          >
            {renderIcon(tab.icon)}
            {tab.label}
            {tab.id === selectedTab.id && (
              <motion.div
                className="absolute right-0 bottom-0 left-0 h-[2px] bg-blue-600"
                layoutId="underline"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Demo component for the docs page
export function SharedLayoutAnimation() {
  const demoTabs: TabItem[] = [
    { id: "tomato", label: "Tomato", icon: "🍅", content: <div className="text-[128px]">🍅</div> },
    { id: "lettuce", label: "Lettuce", icon: "🥬", content: <div className="text-[128px]">🥬</div> },
    { id: "cheese", label: "Cheese", icon: "🧀", content: <div className="text-[128px]">🧀</div> },
  ];

  return (
    <div className="flex h-[60vh] max-h-[360px] w-[480px] flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_1px_1px_hsl(0deg_0%_0%_/_0.075),0_2px_2px_hsl(0deg_0%_0%_/_0.075),0_4px_4px_hsl(0deg_0%_0%_/_0.075),0_8px_8px_hsl(0deg_0%_0%_/_0.075),0_16px_16px_hsl(0deg_0%_0%_/_0.075)]">
      <nav className="h-[44px] rounded-[10px] rounded-b-none border-b border-[#eeeeee] bg-[#fdfdfd] p-[5px] pt-[5px] pb-0">
        <ul className="m-0 flex w-full list-none p-0 text-sm font-medium">
          {demoTabs.map((item) => (
            <motion.li
              key={item.id}
              initial={false}
              animate={{
                backgroundColor: item.id === demoTabs[0].id ? "#eee" : "#eee0",
              }}
              className="relative flex h-6 w-full min-w-0 flex-1 cursor-pointer items-center justify-between rounded-[5px] rounded-b-none bg-white px-[15px] py-[10px] text-[#0f1115] select-none"
            >
              {`${item.icon} ${item.label}`}
              {item.id === demoTabs[0].id && (
                <motion.div
                  className="absolute right-0 -bottom-[2px] left-0 h-[2px] bg-[var(--accent)]"
                  layoutId="underline"
                  id="underline"
                />
              )}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={demoTabs[0].id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[128px]"
          >
            {typeof demoTabs[0].icon === "string" ? demoTabs[0].icon : "😋"}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
