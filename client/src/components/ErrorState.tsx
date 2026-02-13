import { AlertTriangle } from "lucide-react";

export function ErrorState(props: {
  title?: string;
  message: string;
  onRetry: () => void;
  testId?: string;
}) {
  return (
    <div
      data-testid={props.testId}
      className="rounded-3xl border bg-card/85 p-6 md:p-7 card-elev"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-500/10 text-rose-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl">{props.title ?? "Something went wrong"}</h2>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              {props.message}
            </p>
          </div>
        </div>

        <button
          data-testid="retry-button"
          onClick={props.onRetry}
          className={[
            "soft-focus inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold",
            "bg-primary text-primary-foreground",
            "shadow-[0_14px_30px_-22px_hsl(var(--primary)/0.55)]",
            "hover:shadow-[0_16px_34px_-22px_hsl(var(--primary)/0.65)] hover:-translate-y-0.5",
            "active:translate-y-0 active:shadow-[0_12px_26px_-22px_hsl(var(--primary)/0.55)]",
            "transition-all duration-300",
          ].join(" ")}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
