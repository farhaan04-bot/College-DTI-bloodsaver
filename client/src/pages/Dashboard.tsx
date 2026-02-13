import AppShell from "@/components/AppShell";
import { Seo } from "@/components/Seo";
import { useDashboard } from "@/hooks/use-dashboard";
import { SectionCard } from "@/components/SectionCard";
import { StatusPill, type InventoryStatus } from "@/components/StatusPill";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { cn } from "@/lib/utils";
import {
  BellRing,
  ClipboardList,
  Info,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";

const groups = ["A+", "B+", "O+", "O-", "AB+"] as const;

function InventoryCard(props: {
  bloodGroup: (typeof groups)[number];
  status: InventoryStatus;
}) {
  const tone =
    props.status === "Sufficient"
      ? "from-emerald-500/10 to-transparent"
      : props.status === "Low"
        ? "from-amber-500/12 to-transparent"
        : "from-rose-500/12 to-transparent";

  const border =
    props.status === "Sufficient"
      ? "border-emerald-200/70"
      : props.status === "Low"
        ? "border-amber-200/70"
        : "border-rose-200/70";

  return (
    <div
      data-testid={`inventory-card-${props.bloodGroup}`}
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-card/90 p-5 md:p-6",
        "card-elev transition-all duration-300 hover:bg-card",
        "hover:-translate-y-0.5",
        border,
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", tone)} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Blood group</p>
          <p className="mt-2 text-3xl font-bold leading-none tracking-tight">
            {props.bloodGroup}
          </p>
        </div>
        <StatusPill status={props.status} testId={`inventory-status-${props.bloodGroup}`} />
      </div>

      <div className="relative mt-4">
        <p className="text-sm text-muted-foreground">
          Availability status for upcoming demand window.
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const qc = useQueryClient();
  const { data, isLoading, isError, error, refetch, isFetching } = useDashboard();

  const rightSlot = (
    <button
      data-testid="refresh-dashboard"
      onClick={() => refetch()}
      className={cn(
        "soft-focus inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold",
        "bg-white/80 border hover:bg-white",
        "text-foreground",
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-26px_hsl(222_35%_12%/0.18)]",
        "active:translate-y-0",
        isFetching ? "opacity-70 cursor-wait" : "",
      )}
    >
      {isFetching ? "Refreshing…" : "Refresh"}
    </button>
  );

  return (
    <>
      <Seo
        title="Blood Demand & Donor Availability — Dashboard"
        description="Clean healthcare dashboard for an Intelligent Blood Demand & Donor Availability Prediction System (DTI prototype) with inventory status, alerts, explainability, and recommended donors."
      />

      <AppShell
        title="Intelligent Blood Demand & Donor Availability"
        subtitle="ML-based Decision Support Prototype"
        rightSlot={rightSlot}
      >
        {isLoading ? (
          <LoadingState testId="dashboard-loading" />
        ) : isError ? (
          <ErrorState
            testId="dashboard-error"
            message={error instanceof Error ? error.message : "Unknown error"}
            onRetry={() => refetch()}
          />
        ) : !data ? (
          <ErrorState
            testId="dashboard-empty"
            title="No dashboard data"
            message="The server returned an empty response."
            onRetry={() => qc.invalidateQueries({ queryKey: [api.dashboard.get.path] })}
          />
        ) : (
          <div className="space-y-6 md:space-y-7">
            <SectionCard
              testId="alert-section"
              title="Predicted Shortage Alert"
              description="Actionable summary for staff review — no automatic actions."
              icon={<BellRing className="h-5 w-5" />}
              right={
                <span
                  data-testid="alert-badge"
                  className="inline-flex items-center gap-2 rounded-full border bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                >
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Forecast signal
                </span>
              }
              className="enter stagger-1"
            >
              <div className="rounded-2xl border bg-white/70 p-4 md:p-5">
                <p
                  data-testid="alert-message"
                  className="text-base font-semibold leading-relaxed md:text-lg"
                >
                  {data.alertMessage}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Review recommended donors
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    <Info className="h-3.5 w-3.5 text-primary" />
                    Check explainability flags
                  </span>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              testId="inventory-section"
              title="Blood Inventory Snapshot"
              description="Five-group view with clinical color semantics."
              icon={<Stethoscope className="h-5 w-5" />}
              className="enter stagger-2"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {groups.map((g) => (
                  <InventoryCard
                    key={g}
                    bloodGroup={g}
                    status={data.inventory[g] as InventoryStatus}
                  />
                ))}
              </div>
            </SectionCard>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SectionCard
                testId="recommended-donors-section"
                title="Recommended Donors"
                description="Ranked by probability to donate in the upcoming cycle."
                icon={<Users className="h-5 w-5" />}
                className="enter stagger-3"
                right={
                  <button
                    data-testid="copy-donor-list"
                    onClick={async () => {
                      const lines = data.recommendedDonors
                        .map(
                          (d) =>
                            `${d.donorId}\t${d.bloodGroup}\t${d.probabilityToDonate}%`,
                        )
                        .join("\n");
                      await navigator.clipboard.writeText(
                        `Donor ID\tBlood Group\tProbability\n${lines}`,
                      );
                    }}
                    className={cn(
                      "soft-focus inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold",
                      "bg-white/80 border hover:bg-white",
                      "transition-all duration-300 hover:-translate-y-0.5",
                    )}
                  >
                    Copy list
                  </button>
                }
              >
                <div className="overflow-hidden rounded-2xl border bg-white/70">
                  <div className="grid grid-cols-3 gap-0 border-b bg-muted/60 px-4 py-3 text-xs font-bold text-muted-foreground">
                    <div data-testid="donors-col-donorid">Donor ID</div>
                    <div data-testid="donors-col-bloodgroup">Blood Group</div>
                    <div data-testid="donors-col-prob" className="text-right">
                      Probability
                    </div>
                  </div>

                  <div className="divide-y">
                    {data.recommendedDonors.length === 0 ? (
                      <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                        No donor recommendations available.
                      </div>
                    ) : (
                      data.recommendedDonors.map((d, idx) => (
                        <div
                          key={`${d.donorId}-${idx}`}
                          data-testid={`donor-row-${idx}`}
                          className="grid grid-cols-3 items-center px-4 py-3 text-sm transition-colors hover:bg-white"
                        >
                          <div className="font-semibold text-foreground">
                            {d.donorId}
                          </div>
                          <div className="text-muted-foreground">
                            <span className="inline-flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-primary/70" />
                              {d.bloodGroup}
                            </span>
                          </div>
                          <div className="text-right">
                            <span
                              data-testid={`donor-prob-${idx}`}
                              className={cn(
                                "inline-flex items-center justify-end rounded-full border px-3 py-1 text-xs font-bold",
                                d.probabilityToDonate >= 80
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                                  : d.probabilityToDonate >= 55
                                    ? "border-amber-200 bg-amber-50 text-amber-950"
                                    : "border-rose-200 bg-rose-50 text-rose-950",
                              )}
                            >
                              {d.probabilityToDonate}%
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                testId="explainability-section"
                title="Why this alert?"
                description="Explainability flags to support human decision-making."
                icon={<ClipboardList className="h-5 w-5" />}
                className="enter stagger-4"
              >
                <ul className="space-y-3">
                  <li
                    data-testid="explain-high-recent-demand"
                    className="flex items-start justify-between gap-4 rounded-2xl border bg-white/70 p-4"
                  >
                    <div>
                      <p className="text-sm font-bold">High recent demand</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Spike detection over the last collection window.
                      </p>
                    </div>
                    <StatusPill status={data.explainability.highRecentDemand ? "Critical" : "Sufficient"} />
                  </li>

                  <li
                    data-testid="explain-low-inventory"
                    className="flex items-start justify-between gap-4 rounded-2xl border bg-white/70 p-4"
                  >
                    <div>
                      <p className="text-sm font-bold">Low inventory</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Inventory level below safe thresholds.
                      </p>
                    </div>
                    <StatusPill status={data.explainability.lowInventory ? "Low" : "Sufficient"} />
                  </li>

                  <li
                    data-testid="explain-large-donation-gap"
                    className="flex items-start justify-between gap-4 rounded-2xl border bg-white/70 p-4"
                  >
                    <div>
                      <p className="text-sm font-bold">Large donation gap</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Reduced expected donor turnout vs. demand curve.
                      </p>
                    </div>
                    <StatusPill status={data.explainability.largeDonationGap ? "Low" : "Sufficient"} />
                  </li>
                </ul>
              </SectionCard>
            </div>
          </div>
        )}
      </AppShell>
    </>
  );
}
