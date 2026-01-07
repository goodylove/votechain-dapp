import { Card } from "@/components/ui/card";
import { colorConfig } from "@/constant/dummyDats";
import type { ReactNode } from "react";
import React from "react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: "purple" | "blue" | "green" | "pink";
  mono?: boolean;
}

export function StatsCard({ title, value, icon, color, mono }: StatsCardProps) {
  const colors = colorConfig[color];

  // Function to add color to icon if it's an SVG
  const getColoredIcon = () => {
    if (React.isValidElement(icon)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return React.cloneElement(icon as React.ReactElement<any>, {
        style: { color: colors.iconColor, width: "20px", height: "20px" },
      });
    }
    return icon;
  };

  return (
    <Card
      className="p-6 transition-all hover:scale-[1.02] duration-200 shadow-xl border-2"
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = colors.hoverShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 1px 3px 0 ${colors.border}20`;
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <p
          className="text-sm font-inter font-semibold"
          style={{ color: colors.border }}
        >
          {title}
        </p>
        <div
          className="p-2.5 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: colors.iconBg,
          }}
        >
          {getColoredIcon()}
        </div>
      </div>
      <p
        className={`text-2xl font-bold ${
          mono ? "font-mono text-lg tracking-tight" : ""
        }`}
        style={{ color: colors.valueColor }}
      >
        {value}
      </p>
    </Card>
  );
}
