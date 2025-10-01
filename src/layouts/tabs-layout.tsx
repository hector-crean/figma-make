"use client"

import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"
import { useState } from "react"

interface TabItem {
    icon: string
    label: string
}

export default function SharedLayoutAnimation() {
    const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0])

    return (
        <div className="w-[480px] h-[60vh] max-h-[360px] rounded-[10px] bg-white overflow-hidden shadow-[0_1px_1px_hsl(0deg_0%_0%_/_0.075),0_2px_2px_hsl(0deg_0%_0%_/_0.075),0_4px_4px_hsl(0deg_0%_0%_/_0.075),0_8px_8px_hsl(0deg_0%_0%_/_0.075),0_16px_16px_hsl(0deg_0%_0%_/_0.075)] flex flex-col">
            <nav className="bg-[#fdfdfd] p-[5px] pt-[5px] pb-0 rounded-[10px] rounded-b-none border-b border-[#eeeeee] h-[44px]">
                <ul className="list-none p-0 m-0 font-medium text-sm flex w-full">
                    {tabs.map((item) => (
                        <motion.li
                            key={item.label}
                            initial={false}
                            animate={{
                                backgroundColor:
                                    item === selectedTab ? "#eee" : "#eee0",
                            }}
                            className="rounded-[5px] rounded-b-none w-full py-[10px] px-[15px] relative bg-white cursor-pointer h-6 flex justify-between items-center flex-1 min-w-0 select-none text-[#0f1115]"
                            onClick={() => setSelectedTab(item)}
                        >
                            {`${item.icon} ${item.label}`}
                            {item === selectedTab ? (
                                <motion.div
                                    className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[var(--accent)]"
                                    layoutId="underline"
                                    id="underline"
                                />
                            ) : null}
                        </motion.li>
                    ))}
                </ul>
            </nav>
            <main className="flex justify-center items-center flex-1">
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
    )
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
]

const [tomato, lettuce, cheese] = allIngredients
const tabs: TabItem[] = [tomato, lettuce, cheese]
