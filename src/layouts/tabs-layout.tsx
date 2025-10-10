"use client";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useState } from "react";

interface TabItem {
  icon: string;
  label: string;
}

export default function SharedLayoutAnimation() {
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  return (
    <div className="flex h-[60vh] max-h-[360px] w-[480px] flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_1px_1px_hsl(0deg_0%_0%_/_0.075),0_2px_2px_hsl(0deg_0%_0%_/_0.075),0_4px_4px_hsl(0deg_0%_0%_/_0.075),0_8px_8px_hsl(0deg_0%_0%_/_0.075),0_16px_16px_hsl(0deg_0%_0%_/_0.075)]">
      <nav className="h-[44px] rounded-[10px] rounded-b-none border-b border-[#eeeeee] bg-[#fdfdfd] p-[5px] pt-[5px] pb-0">
        <ul className="m-0 flex w-full list-none p-0 text-sm font-medium">
          {tabs.map((item) => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                backgroundColor: item === selectedTab ? "#eee" : "#eee0",
              }}
              className="relative flex h-6 w-full min-w-0 flex-1 cursor-pointer items-center justify-between rounded-[5px] rounded-b-none bg-white px-[15px] py-[10px] text-[#0f1115] select-none"
              onClick={() => setSelectedTab(item)}
            >
              {`${item.icon} ${item.label}`}
              {item === selectedTab ? (
                <motion.div
                  className="absolute right-0 -bottom-[2px] left-0 h-[2px] bg-[var(--accent)]"
                  layoutId="underline"
                  id="underline"
                />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[128px]"
          >
            {selectedTab ? selectedTab.icon : "😋"}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

/**
 * ==============   Data   ================
 */

const allIngredients: TabItem[] = [
  { icon: "🍅", label: "Tomato" },
  { icon: "🥬", label: "Lettuce" },
  { icon: "🧀", label: "Cheese" },
  { icon: "🥕", label: "Carrot" },
  { icon: "🍌", label: "Banana" },
  { icon: "🫐", label: "Blueberries" },
  { icon: "🥂", label: "Champers?" },
];

const [tomato, lettuce, cheese] = allIngredients;
const tabs: TabItem[] = [tomato, lettuce, cheese];
