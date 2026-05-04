import { Badge } from "./Badge";

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
        className="absolute inset-0 -translate-x-2 translate-y-2 rounded-[2.25rem] bg-violet-100/60"
        aria-hidden="true"
      />
      <div className="relative rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(167,139,250,0.18)]">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-violet-700">
          {group.category}
        </h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <Badge key={item} tone="muted">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
