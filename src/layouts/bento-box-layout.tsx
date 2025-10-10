"use client";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useState, createContext, useContext } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Types
type BentoItem<T = {}> = T & {
  id: string;
  icon: string;
  color: string;
  size: "small" | "medium" | "large";
};

// Variants
const bentoGridVariants = cva("grid gap-4", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 4,
  },
});

const bentoCardVariants = cva(
  "relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300",
  {
    variants: {
      size: {
        small: "col-span-1 row-span-1",
        medium: "col-span-1 md:col-span-2 row-span-1",
        large: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);

// Context
interface BentoContextValue<T> {
  selectedItem: BentoItem<T> | null;
  setSelectedItem: (item: BentoItem<T> | null) => void;
  hoveredItem: string | null;
  setHoveredItem: (id: string | null) => void;
}

const BentoContext = createContext<BentoContextValue<any> | null>(null);

function useBentoContext<T>() {
  const context = useContext(BentoContext);
  if (!context) {
    throw new Error("useBentoContext must be used within a BentoBox");
  }
  return context as BentoContextValue<T>;
}

// Main Components
interface BentoBoxProps<T> {
  children: React.ReactNode;
  className?: string;
}

function BentoBox<T>({ children, className }: BentoBoxProps<T>) {
  const [selectedItem, setSelectedItem] = useState<BentoItem<T> | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <BentoContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        hoveredItem,
        setHoveredItem,
      }}
    >
      <div className={cn("relative isolate h-dvh w-dvw", className)}>
        {children}
      </div>
    </BentoContext.Provider>
  );
}

interface BentoGridProps<T> extends VariantProps<typeof bentoGridVariants> {
  items: BentoItem<T>[];
  children: (item: BentoItem<T>, index: number) => React.ReactNode;
  className?: string;
}

function BentoGrid<T>({
  items,
  children,
  columns,
  className,
}: BentoGridProps<T>) {
  return (
    <div className="p-6">
      <motion.div
        layout
        className={cn(bentoGridVariants({ columns }), className)}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <BentoCard key={item.id} item={item} index={index}>
              {children(item, index)}
            </BentoCard>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

interface BentoCardProps<T> {
  item: BentoItem<T>;
  index: number;
  children: React.ReactNode;
  className?: string;
}

function BentoCard<T>({ item, index, children, className }: BentoCardProps<T>) {
  const { setSelectedItem, hoveredItem, setHoveredItem } = useBentoContext<T>();

  return (
    <motion.div
      layoutId={`bento-${item.id}`}
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        layout: { duration: 0.3 },
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHoveredItem(item.id)}
      onHoverEnd={() => setHoveredItem(null)}
      onClick={() => setSelectedItem(item)}
      className={cn(
        bentoCardVariants({ size: item.size }),
        item.color,
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface BentoModalProps<T> {
  children: (item: BentoItem<T>) => React.ReactNode;
  className?: string;
}

function BentoModal<T>({ children, className }: BentoModalProps<T>) {
  const { selectedItem, setSelectedItem } = useBentoContext<T>();

  return (
    <AnimatePresence>
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            key={`detail-${selectedItem.id}`}
            layoutId={`bento-${selectedItem.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative w-full max-w-4xl cursor-default overflow-hidden rounded-2xl shadow-2xl",
              selectedItem.color,
              className
            )}
          >
            {children(selectedItem)}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Default Components
interface DefaultBentoCardProps<T> {
  item: BentoItem<T>;
  title?: keyof T;
  description?: keyof T;
  category?: keyof T;
}

function DefaultBentoCard<T>({
  item,
  title = "title" as keyof T,
  description = "description" as keyof T,
  category = "category" as keyof T,
}: DefaultBentoCardProps<T>) {
  const { hoveredItem } = useBentoContext<T>();

  return (
    <>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-white/20"></div>
        <div className="absolute bottom-4 left-4 h-8 w-8 rounded-full bg-white/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <motion.div
            animate={{
              rotate: hoveredItem === item.id ? 360 : 0,
              scale: hoveredItem === item.id ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="text-3xl"
          >
            {item.icon}
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium"
          >
            {String(item[category])}
          </motion.span>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-2 text-lg font-semibold text-white"
        >
          {String(item[title])}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 text-sm leading-relaxed text-white/80"
        >
          {String(item[description])}
        </motion.p>

        {/* Hover Effect Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: hoveredItem === item.id ? 1 : 0,
          }}
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
        />
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)`,
        }}
        animate={{
          backgroundPosition: hoveredItem === item.id ? "200% 200%" : "0% 0%",
        }}
        transition={{
          duration: 1.5,
          repeat: hoveredItem === item.id ? Infinity : 0,
        }}
      />
    </>
  );
}

interface DefaultBentoModalProps<T> {
  item: BentoItem<T>;
  title?: keyof T;
  description?: keyof T;
  category?: keyof T;
  features?: string[];
  benefits?: string[];
  integrations?: string[];
}

function DefaultBentoModal<T>({
  item,
  title = "title" as keyof T,
  description = "description" as keyof T,
  category = "category" as keyof T,
  features = [
    "Advanced analytics",
    "Real-time monitoring",
    "Custom dashboards",
  ],
  benefits = ["Increased efficiency", "Better insights", "Cost savings"],
  integrations = ["API access", "Webhook support", "Third-party tools"],
}: DefaultBentoModalProps<T>) {
  return (
    <div className="relative z-10 p-8 md:p-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-6xl"
        >
          {item.icon}
        </motion.div>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium"
        >
          {String(item[category])}
        </motion.span>
      </div>

      {/* Title and Description */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 text-4xl font-bold text-white md:text-5xl"
      >
        {String(item[title])}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl"
      >
        {String(item[description])}
      </motion.p>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        <div className="rounded-xl bg-white/10 p-6">
          <h3 className="mb-2 font-semibold text-white">Features</h3>
          <ul className="space-y-1 text-white/80">
            {features.map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-white/10 p-6">
          <h3 className="mb-2 font-semibold text-white">Benefits</h3>
          <ul className="space-y-1 text-white/80">
            {benefits.map((benefit, index) => (
              <li key={index}>• {benefit}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-white/10 p-6">
          <h3 className="mb-2 font-semibold text-white">Integration</h3>
          <ul className="space-y-1 text-white/80">
            {integrations.map((integration, index) => (
              <li key={index}>• {integration}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-100"
        >
          Learn More
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl bg-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/30"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}

// Export everything
export {
  BentoBox,
  BentoGrid,
  BentoCard,
  BentoModal,
  DefaultBentoCard,
  DefaultBentoModal,
  useBentoContext,
};

export type { BentoItem };
