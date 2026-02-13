import { cn } from "@/lib/utils";

export type InventoryStatus = "Sufficient" | "Low" | "Critical";

const styles: Record<InventoryStatus, { wrap: string; dot: string; label: string }> = {
  Sufficient: {
    wrap: "bg-emerald-50 text-emerald-900 border-emerald-200",
    dot: "bg-emerald-500",
    label: "Sufficient",
  },
  Low: {
    wrap: "bg-amber-50 text-amber-950 border-amber-200",
    dot: "bg-amber-500",
    label: "Low",
  },
  Critical: {
    wrap: "bg-rose-50 text-rose-950 border-rose-200",
    dot: "bg-rose-500",
    label: "Critical",
  },
};

export function StatusPill(props: { status: InventoryStatus; className?: string; testId?: string }) {
  const s = styles[props.status];

  return (
    <span
      data-testid={props.testId}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-tight",
        "transition-all duration-300",
        s.wrap,
        props.className,
      )}
    >
      <span className={cn("h-2 w-2 rounded-full shadow-[0_0_0_4px_currentColor/0.06]", s.dot)} />
      {s.label}
    </span>
  );
}
