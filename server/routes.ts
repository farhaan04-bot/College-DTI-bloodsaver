import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

function ml_prediction() {
  // ==========================================================
  // Dummy ML logic (academic prototype)
  // ==========================================================
  // TODO(ML): Integrate real models later
  // - Logistic Regression: donor availability prediction
  // - Random Forest: blood demand prediction
  // - Gradient Boosting: accuracy improvement / ensemble

  const alertMessage = "B+ blood shortage expected in next 72 hours";

  const inventory = {
    "A+": "Sufficient",
    "B+": "Critical",
    "O+": "Low",
    "O-": "Low",
    "AB+": "Sufficient",
  } as const;

  const recommendedDonors = [
    { donorId: "DNR-1021", bloodGroup: "B+", probabilityToDonate: 86 },
    { donorId: "DNR-0884", bloodGroup: "B+", probabilityToDonate: 79 },
    { donorId: "DNR-1407", bloodGroup: "O+", probabilityToDonate: 71 },
    { donorId: "DNR-0512", bloodGroup: "O-", probabilityToDonate: 68 },
    { donorId: "DNR-1109", bloodGroup: "A+", probabilityToDonate: 62 },
  ] as const;

  return {
    alertMessage,
    inventory,
    recommendedDonors: [...recommendedDonors],
    explainability: {
      highRecentDemand: true,
      lowInventory: true,
      largeDonationGap: true,
    },
  };
}

async function seedDatabase(): Promise<void> {
  const current = await storage.getDashboard();
  const hasAnyDonors = current.recommendedDonors.length > 0;

  if (hasAnyDonors) return;

  const seed = ml_prediction();
  await storage.upsertDashboard(seed);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  await seedDatabase();

  app.get(api.dashboard.get.path, async (_req, res) => {
    const dashboard = await storage.getDashboard();
    res.json(dashboard);
  });

  app.use((err: unknown, _req: unknown, res: any, _next: unknown) => {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.errors[0]?.message ?? "Invalid request",
        field: err.errors[0]?.path?.join(".") ?? undefined,
      });
    }

    // Let the base error handler/logging deal with it; return safe message.
    return res.status(500).json({ message: "Internal server error" });
  });

  return httpServer;
}
