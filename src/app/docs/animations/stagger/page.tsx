"use client";

import { motion, Variants } from "motion/react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, pathLength: 0 },
  show: {
    opacity: 1,
    pathLength: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
};

function Stagger() {
  return (
    <motion.svg
      width="600"
      height="600"
      viewBox="0 0 600 600"
      variants={container}
      initial="hidden"
      animate="show"
      className="h-auto max-w-full"
    >
      <motion.circle
        className="fill-transparent stroke-[10]"
        cx="100"
        cy="100"
        r="80"
        stroke="#ff0088"
        strokeLinecap="round"
        variants={item}
      />
      <motion.line
        className="fill-transparent stroke-[10]"
        x1="220"
        y1="30"
        x2="360"
        y2="170"
        stroke="#8df0cc"
        strokeLinecap="round"
        variants={item}
      />
      <motion.line
        className="fill-transparent stroke-[10]"
        x1="220"
        y1="170"
        x2="360"
        y2="30"
        stroke="#8df0cc"
        strokeLinecap="round"
        variants={item}
      />
      <motion.rect
        className="fill-transparent stroke-[10]"
        width="140"
        height="140"
        x="410"
        y="30"
        rx="20"
        stroke="#0d63f8"
        strokeLinecap="round"
        variants={item}
      />
      <motion.circle
        className="fill-transparent stroke-[10]"
        cx="100"
        cy="300"
        r="80"
        stroke="#0d63f8"
        strokeLinecap="round"
        variants={item}
      />
      <motion.line
        className="fill-transparent stroke-[10]"
        x1="220"
        y1="230"
        x2="360"
        y2="370"
        stroke="#ff0088"
        strokeLinecap="round"
        variants={item}
      />
      <motion.line
        className="fill-transparent stroke-[10]"
        x1="220"
        y1="370"
        x2="360"
        y2="230"
        stroke="#ff0088"
        strokeLinecap="round"
        variants={item}
      />
      <motion.rect
        className="fill-transparent stroke-[10]"
        width="140"
        height="140"
        x="410"
        y="230"
        rx="20"
        stroke="#8df0cc"
        strokeLinecap="round"
        variants={item}
      />
      <motion.circle
        className="fill-transparent stroke-[10]"
        cx="100"
        cy="500"
        r="80"
        stroke="#8df0cc"
        strokeLinecap="round"
        variants={item}
      />
      <motion.line
        className="fill-transparent stroke-[10]"
        x1="220"
        y1="430"
        x2="360"
        y2="570"
        stroke="#0d63f8"
        strokeLinecap="round"
        variants={item}
      />
      <motion.line
        className="fill-transparent stroke-[10]"
        x1="220"
        y1="570"
        x2="360"
        y2="430"
        stroke="#0d63f8"
        strokeLinecap="round"
        variants={item}
      />
      <motion.rect
        className="fill-transparent stroke-[10]"
        width="140"
        height="140"
        x="410"
        y="430"
        rx="20"
        stroke="#ff0088"
        strokeLinecap="round"
        variants={item}
      />
    </motion.svg>
  );
}

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Stagger />
    </div>
  );
};

export default Page;
