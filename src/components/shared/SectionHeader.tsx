"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
      <div
        className={cn(
          "mt-2 h-1 w-16 rounded-full bg-accent",
          align === "center" && "mx-auto"
        )}
      />
      {subtitle && (
        <p className="mt-3 text-base text-gray-600 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
