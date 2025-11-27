"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  shortLabel?: string; // For compact mode
  badge?: string | number;
  component: React.ComponentType;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'scroll' | 'dropdown' | 'carousel' | 'compact';
}


// Variant 2: Carousel with Arrow Navigation
export function CarouselTabs({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        ref.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [tabs]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="flex-shrink-0 p-2 bg-blue-200 hover:bg-blue-300 rounded-lg transition-colors z-10"
        >
          <ChevronLeft size={20} className="text-slate-700" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto scrollbar-hide scroll-smooth flex-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            initial={false}
            animate={{
              backgroundColor: activeTab === tab.id ? "#e0e7ff" : "#e2e8f0",
            }}
            className={`
              relative px-6 py-2.5 rounded-t-xl text-sm whitespace-nowrap flex-shrink-0
              ${activeTab === tab.id
                ? 'text-slate-900 shadow-sm'
                : 'text-slate-700 hover:bg-slate-400'
              }
            `}
          >
            {tab.label}
            {tab.badge && (
              <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {tab.badge}
              </span>
            )}
            {activeTab === tab.id && (
              <motion.div
                className="absolute right-0 -bottom-[1px] left-0 h-[2px] bg-blue-500 rounded-t-full"
                layoutId="underline"
                id="underline"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="flex-shrink-0 p-2 bg-blue-200 hover:bg-blue-300 rounded-lg transition-colors z-10"
        >
          <ChevronRight size={20} className="text-slate-700" />
        </button>
      )}
    </div>
  );
}
