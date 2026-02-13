import { Activity, Droplets, HeartPulse, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

function NavItem(props: {
  href: string;
  label: string;
  icon: React.ReactNode;
  testId: string;
}) {
  const [loc] = useLocation();
  const active = loc === props.href;

  return (
    <Link
      href={props.href}
      data-testid={props.testId}
      className={cn(
        "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/15",
        active
          ? "bg-primary/10 text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/70",
      )}
    >
      <span
        className={cn(
          "grid place-items-center rounded-xl p-2 transition-all duration-300",
          active
            ? "bg-white text-primary shadow-[0_10px_24px_-18px_hsl(var(--primary)/0.55)]"
            : "bg-white/70 text-foreground/70 group-hover:text-foreground group-hover:bg-white",
        )}
      >
        {props.icon}
      </span>
      <span className="truncate">{props.label}</span>
      {active && (
        <span className="absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]" />
      )}
    </Link>
  );
}

export default function AppShell(props: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="surface grain min-h-dvh">
      <div className="relative z-10">
        <div className="container-pro py-6 md:py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:gap-8">
            <aside className="enter stagger-1">
              <div
                className={cn(
                  "rounded-3xl border bg-card/85 backdrop-blur-md",
                  "p-4 md:p-5 card-elev",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_14px_30px_-22px_hsl(var(--primary)/0.7)]">
                        <Droplets className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">
                          Blood Bank Intelligence
                        </p>
                        <p className="text-lg font-bold leading-none">
                          DTI Dashboard
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border bg-white/70 p-4">
                      <p className="text-xs font-semibold text-muted-foreground">
                        Prototype status
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        ML-based decision support
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="chip-elev inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold text-foreground/80">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          Clinical-friendly UI
                        </span>
                        <span className="chip-elev inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold text-foreground/80">
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          Explainable outputs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-1">
                  <NavItem
                    href="/"
                    label="Dashboard"
                    icon={<Activity className="h-4 w-4" />}
                    testId="nav-dashboard"
                  />
                  <NavItem
                    href="/models"
                    label="Models Used"
                    icon={<HeartPulse className="h-4 w-4" />}
                    testId="nav-models"
                  />
                  <NavItem
                    href="/ethics"
                    label="Ethics & DTI"
                    icon={<ShieldCheck className="h-4 w-4" />}
                    testId="nav-ethics"
                  />
                </div>

                <div className="mt-5 rounded-2xl border bg-muted/60 p-4">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Data notice
                  </p>
                  <p className="mt-1 text-sm text-foreground/80">
                    Academic prototype — visuals are production-grade; endpoint is
                    the single source of truth.
                  </p>
                </div>
              </div>
            </aside>

            <main className="enter stagger-2">
              <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1
                    data-testid="page-title"
                    className="text-3xl leading-[1.05] md:text-4xl"
                  >
                    {props.title}
                  </h1>
                  {props.subtitle ? (
                    <p
                      data-testid="page-subtitle"
                      className="mt-2 max-w-2xl text-base text-muted-foreground md:text-lg"
                    >
                      {props.subtitle}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center gap-2">{props.rightSlot}</div>
              </header>

              <div className="mt-6 md:mt-7">{props.children}</div>

              <footer className="mt-10 pb-10">
                <div className="flex flex-col gap-1 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                  <p>Intelligent Blood Demand & Donor Availability Prediction System</p>
                  <p className="text-xs">
                    Built for small & rural blood banks · Human-in-the-loop
                  </p>
                </div>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
