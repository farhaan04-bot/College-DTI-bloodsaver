import { Loader2 } from "lucide-react";

export function LoadingState(props: { label?: string; testId?: string }) {
  return (
    <div
      data-testid={props.testId}
      className="grid place-items-center rounded-3xl border bg-card/80 p-10 card-elev"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Loader2 className="h-5 w-5 animate-spin" />
        </span>
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Loading</p>
          <p className="text-base font-semibold text-foreground">
            {props.label ?? "Fetching dashboard insights…"}
          </p>
        </div>
      </div>

      <div className="mt-6 w-full max-w-xl">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-2xl border bg-muted/50 animate-pulse"
            />
          ))}
        </div>
        <div className="mt-3 h-28 rounded-2xl border bg-muted/50 animate-pulse" />
      </div>
    </div>
  );
}
