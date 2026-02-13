import AppShell from "@/components/AppShell";
import { Seo } from "@/components/Seo";
import { Link } from "wouter";
import { ArrowLeft, FileX2 } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Seo title="Not Found — DTI Dashboard" description="Page not found." />
      <AppShell title="Page not found" subtitle="The link you followed doesn’t exist in this prototype.">
        <div
          data-testid="not-found"
          className="rounded-3xl border bg-card/85 p-7 md:p-8 card-elev"
        >
          <div className="flex flex-col items-center text-center">
            <div className="grid h-14 w-14 place-items-center rounded-3xl bg-primary/10 text-primary">
              <FileX2 className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl">Route missing</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
              If this is a new page, add it to the router. Otherwise, head back to the
              dashboard to continue reviewing inventory signals and donor recommendations.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                data-testid="go-dashboard"
                className="soft-focus inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-22px_hsl(var(--primary)/0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-22px_hsl(var(--primary)/0.65)] active:translate-y-0"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to dashboard
              </Link>

              <Link
                href="/models"
                data-testid="go-models"
                className="soft-focus inline-flex items-center justify-center rounded-2xl border bg-white/80 px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                View models used
              </Link>
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}
