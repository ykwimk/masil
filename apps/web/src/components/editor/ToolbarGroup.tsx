interface ToolbarGroupProps {
  children: React.ReactNode;
  label: string;
}

export default function ToolbarGroup({ children, label }: ToolbarGroupProps) {
  return (
    <div className="flex items-center gap-1 rounded-md border bg-white px-2 py-1">
      <span className="text-muted-foreground mr-1 text-[10px] whitespace-nowrap">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  );
}
