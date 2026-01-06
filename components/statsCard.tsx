import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: "purple" | "blue" | "green" | "pink";
  mono?: boolean;
}

export function StatsCard({ title, value, icon, color, mono }: StatsCardProps) {
  const colorClasses = {
    purple: "purple-500/20",
    blue: "blue-500/20",
    green: "green-500/20",
    pink: "red-500/20",
  };

  return (
    <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-800/70 transition-all hover:shadow-lg hover:shadow-purple-500/10">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-400">{title}</p>
        <div className={`p-2 rounded-lg bg-${colorClasses[color]}`}>{icon}</div>
      </div>
      <p
        className={`text-2xl font-bold text-white ${
          mono ? "font-mono text-lg" : ""
        }`}
      >
        {value}
      </p>
    </Card>
  );
}
