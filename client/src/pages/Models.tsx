import AppShell from "@/components/AppShell";
import { Seo } from "@/components/Seo";
import { SectionCard } from "@/components/SectionCard";
import { BrainCircuit, LineChart, ShieldCheck } from "lucide-react";

export default function ModelsPage() {
  return (
    <>
      <Seo
        title="Models Used — Blood Bank Intelligence"
        description="Models used in the Intelligent Blood Demand & Donor Availability Prediction System prototype."
      />
      <AppShell
        title="Models Used"
        subtitle="A lightweight ensemble designed for interpretability + operational usefulness."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <SectionCard
            testId="model-logistic-regression"
            title="Logistic Regression"
            description="Donor availability prediction"
            icon={<BrainCircuit className="h-5 w-5" />}
            className="enter stagger-1"
          >
            <div className="rounded-2xl border bg-white/70 p-4">
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Probability output supports ranking donors.</li>
                <li>Coefficients provide a transparent signal chain.</li>
                <li>Works well with sparse, structured features.</li>
              </ul>
            </div>
          </SectionCard>

          <SectionCard
            testId="model-random-forest"
            title="Random Forest"
            description="Blood demand prediction"
            icon={<LineChart className="h-5 w-5" />}
            className="enter stagger-2"
          >
            <div className="rounded-2xl border bg-white/70 p-4">
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Captures non-linear relationships in demand drivers.</li>
                <li>Robust baseline for tabular forecasting features.</li>
                <li>Feature importance supports review & audit.</li>
              </ul>
            </div>
          </SectionCard>

          <SectionCard
            testId="model-gradient-boosting"
            title="Gradient Boosting"
            description="Accuracy improvement"
            icon={<ShieldCheck className="h-5 w-5" />}
            className="enter stagger-3"
          >
            <div className="rounded-2xl border bg-white/70 p-4">
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Improves precision in borderline scarcity situations.</li>
                <li>Calibrated outputs reduce alert noise.</li>
                <li>Pairs well with explainability reporting.</li>
              </ul>
            </div>
          </SectionCard>
        </div>

        <div className="mt-6">
          <SectionCard
            testId="model-notes"
            title="Operational Notes"
            description="How model outputs are intended to be used in practice."
            className="enter stagger-4"
          >
            <div className="rounded-2xl border bg-white/70 p-5">
              <div className="prose prose-sm max-w-none text-foreground prose-p:text-muted-foreground">
                <p>
                  This prototype focuses on presenting clinically meaningful signals
                  rather than automating decisions. Inventory labels (Sufficient / Low / Critical)
                  are intended as guidance for staff, with explainability flags to support
                  review and override.
                </p>
                <p>
                  Model outputs should be monitored for drift, and thresholds should be
                  adjusted based on local context (seasonality, rural donation patterns, and
                  rare group scarcity).
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </AppShell>
    </>
  );
}
