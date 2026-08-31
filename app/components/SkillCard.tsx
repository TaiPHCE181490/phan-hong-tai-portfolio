import { Badge } from "./Badge";
import { Cpu } from "lucide-react";

type SkillGroup = {
  category: string;
  items: string[];
};

type SkillCardProps = {
  group: SkillGroup;
};

export function SkillCard({ group }: SkillCardProps) {
  return (
    <div className="group relative">
      <div
        className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-slate-700/20 via-indigo-500/20 to-slate-800/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative rounded-[2.25rem] glass-art-card p-8 text-slate-100 transition-all duration-500 group-hover:-translate-y-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-200 shadow-md">
            <Cpu className="w-5 h-5 text-slate-300" />
          </div>
          <h3 className="font-art-title text-2xl font-bold tracking-wide text-white group-hover:text-slate-100 transition-all duration-300">
            {group.category}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {group.items.map((item) => (
            <Badge key={item} tone="default">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
