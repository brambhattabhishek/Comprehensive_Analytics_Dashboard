
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "card" | "list" | "table" | "chart";
  count?: number;
}

export function SkeletonLoader({ 
  className, 
  variant = "card", 
  count = 1 
}: SkeletonLoaderProps) {
  const variants = {
    card: (
      <div className={cn("rounded-lg overflow-hidden", className)}>
        <div className="h-40 bg-muted animate-shimmer mb-4 rounded-t-lg" />
        <div className="p-4 space-y-3">
          <div className="h-5 w-2/3 bg-muted animate-shimmer rounded" />
          <div className="h-4 w-full bg-muted animate-shimmer rounded" />
          <div className="h-4 w-full bg-muted animate-shimmer rounded" />
          <div className="h-4 w-1/2 bg-muted animate-shimmer rounded" />
        </div>
      </div>
    ),
    list: (
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted animate-shimmer" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-1/3 bg-muted animate-shimmer rounded" />
            <div className="h-3 w-2/3 bg-muted animate-shimmer rounded" />
          </div>
        </div>
        <div className="h-16 w-full bg-muted animate-shimmer rounded" />
      </div>
    ),
    table: (
      <div className={cn("w-full", className)}>
        <div className="h-10 w-full bg-muted animate-shimmer rounded mb-4" />
        <div className="space-y-3">
          <div className="h-12 w-full bg-muted animate-shimmer rounded" />
          <div className="h-12 w-full bg-muted animate-shimmer rounded" />
          <div className="h-12 w-full bg-muted animate-shimmer rounded" />
          <div className="h-12 w-full bg-muted animate-shimmer rounded" />
        </div>
      </div>
    ),
    chart: (
      <div className={cn("w-full", className)}>
        <div className="h-6 w-1/4 bg-muted animate-shimmer rounded mb-6" />
        <div className="h-64 w-full bg-muted animate-shimmer rounded" />
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{variants[variant]}</div>
      ))}
    </motion.div>
  );
}
