"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React, { forwardRef } from "react";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export const StaggerContainer = forwardRef<HTMLElement, StaggerContainerProps>(
  ({ children, className, as, ...props }, ref) => {
    const Component = as ? motion.create(as as any) : motion.div;
    return (
      <Component
        ref={ref}
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className={className}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
StaggerContainer.displayName = "StaggerContainer";

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const StaggerItem = forwardRef<HTMLDivElement, StaggerItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
          show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 300, damping: 24 } },
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
StaggerItem.displayName = "StaggerItem";
