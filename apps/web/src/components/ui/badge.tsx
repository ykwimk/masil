import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "badge inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary",
        className
      )}
      {...props}
    />
  );
}

export { Badge };

