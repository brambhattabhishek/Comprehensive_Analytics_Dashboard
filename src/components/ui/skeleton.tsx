
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "text" | "avatar" | "button";
}

function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  const variantClasses = {
    default: "rounded-md bg-muted",
    card: "rounded-lg bg-muted min-h-[120px]",
    text: "h-4 w-full rounded-md bg-muted",
    avatar: "h-12 w-12 rounded-full bg-muted",
    button: "h-10 w-24 rounded-md bg-muted"
  };

  return (
    <div
      className={cn("animate-pulse shimmer", variantClasses[variant], className)}
      {...props}
    />
  );
}

export { Skeleton };
