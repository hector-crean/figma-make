"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Tab } from "./tab-navigation";

interface TabsContextType {
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  tabs: Tab[];
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProviderProps {
  children: ReactNode;
  tabs: Tab[];
  defaultTabId?: string;
}

export function TabsProvider({ children, tabs, defaultTabId }: TabsProviderProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id || "");

  return (
    <TabsContext.Provider value={{ activeTabId, setActiveTabId, tabs }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}



