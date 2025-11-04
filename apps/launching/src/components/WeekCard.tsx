interface WeekCardProps {
  tag: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function WeekCard({
  tag,
  icon,
  title,
  description,
}: WeekCardProps) {
  return (
    <div className="border-border rounded-2xl border bg-white p-6 transition-shadow hover:shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground inline-flex items-center gap-2 text-sm">
          <span className="badge">
            <span className="font-semibold">{tag}</span>
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        {icon}
        <div className="flex-1">
          <h4 className="text-base font-semibold">{title}</h4>
          <p className="text-foreground/70 mt-2 text-sm leading-relaxed break-keep md:text-[15px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
