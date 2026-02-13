import { cn } from "@/lib/utils";

export function SectionCard(props: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  testId?: string;
  right?: React.ReactNode;
}) {
  return (
    <section
      data-testid={props.testId}
      className={cn(
        "rounded-3xl border bg-card/85 backdrop-blur-md",
        "p-5 md:p-6 card-elev",
        "transition-all duration-300",
        "hover:bg-card/95",
        props.className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          {props.icon ? (
            <div className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-muted text-foreground shadow-[0_10px_24px_-20px_hsl(222_35%_12%/0.25)]">
              {props.icon}
            </div>
          ) : null}
          <div className="min-w-0">
            <h2 className="text-xl md:text-2xl">{props.title}</h2>
            {props.description ? (
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                {props.description}
              </p>
            ) : null}
          </div>
        </div>
        {props.right ? <div className="shrink-0">{props.right}</div> : null}
      </div>

      <div className="mt-4 md:mt-5">{props.children}</div>
    </section>
  );
}
