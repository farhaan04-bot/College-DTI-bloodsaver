import AppShell from "@/components/AppShell";
import { Seo } from "@/components/Seo";
import { SectionCard } from "@/components/SectionCard";
import { HandHeart, Scale, SearchCheck, UsersRound } from "lucide-react";

function Principle(props: {
  testId: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      data-testid={props.testId}
      className="rounded-3xl border bg-card/85 p-5 md:p-6 card-elev transition-all duration-300 hover:bg-card"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary shadow-[0_14px_30px_-22px_hsl(var(--primary)/0.35)]">
          {props.icon}
        </div>
        <div>
          <h3 className="text-lg md:text-xl">{props.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            {props.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function EthicsPage() {
  return (
    <>
      <Seo
        title="Ethics & DTI — Blood Bank Intelligence"
        description="Ethics and DTI principles: human-in-the-loop, rare blood group priority, explainable predictions, designed for small and rural blood banks."
      />

      <AppShell
        title="Ethics & DTI"
        subtitle="Designed for trust: transparency, fairness, and safe clinical workflows."
      >
        <SectionCard
          testId="ethics-overview"
          title="DTI Principles"
          description="Decision-support only — clinicians and coordinators stay in control."
          className="enter stagger-1"
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Principle
              testId="principle-human-in-loop"
              title="Human-in-the-loop"
              body="No automatic actions. The system suggests; staff decide, document, and override when needed."
              icon={<UsersRound className="h-5 w-5" />}
            />
            <Principle
              testId="principle-rare-priority"
              title="Rare blood group priority"
              body="Scarce groups should be flagged earlier to reduce preventable shortages and improve allocation fairness."
              icon={<HandHeart className="h-5 w-5" />}
            />
            <Principle
              testId="principle-explainable"
              title="Explainable predictions"
              body="Each alert includes interpretable factors (demand spike, inventory, donation gap) to support trust and auditing."
              icon={<SearchCheck className="h-5 w-5" />}
            />
            <Principle
              testId="principle-rural-first"
              title="Small & rural blood banks"
              body="Built to work with limited data and staffing, prioritizing clarity, speed, and practical guidance."
              icon={<Scale className="h-5 w-5" />}
            />
          </div>
        </SectionCard>

        <div className="mt-6">
          <SectionCard
            testId="ethics-notes"
            title="Implementation Notes"
            description="Recommended guardrails for a production deployment."
            className="enter stagger-2"
          >
            <div className="rounded-2xl border bg-white/70 p-5">
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>
                  Log every alert review action and store the reason for any override.
                </li>
                <li>
                  Periodically evaluate model performance across blood groups to reduce hidden bias.
                </li>
                <li>
                  Keep thresholds configurable by site; rural patterns vary substantially.
                </li>
                <li>
                  Provide patient-safety escalation workflows for Critical inventory statuses.
                </li>
              </ul>
            </div>
          </SectionCard>
        </div>
      </AppShell>
    </>
  );
}
