import { db } from "./db";
import { inventoryStatuses, predictions, recommendedDonors } from "@shared/schema";
import type { DashboardResponse } from "@shared/routes";
import { eq } from "drizzle-orm";

export interface IStorage {
  getDashboard(): Promise<DashboardResponse>;
  upsertDashboard(input: DashboardResponse): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getDashboard(): Promise<DashboardResponse> {
    const [prediction] = await db.select().from(predictions).limit(1);

    const invRows = await db.select().from(inventoryStatuses);
    const donorRows = await db.select().from(recommendedDonors);

    const inventory: DashboardResponse["inventory"] = {
      "A+": "Sufficient",
      "B+": "Sufficient",
      "O+": "Sufficient",
      "O-": "Sufficient",
      "AB+": "Sufficient",
    };

    for (const row of invRows) {
      const bg = row.bloodGroup as keyof DashboardResponse["inventory"];
      const st = row.status as DashboardResponse["inventory"][keyof DashboardResponse["inventory"]];
      if (bg in inventory) inventory[bg] = st;
    }

    return {
      alertMessage: prediction?.alertMessage ?? "No alert available.",
      inventory,
      recommendedDonors: donorRows.map((d) => ({
        donorId: d.donorId,
        bloodGroup: d.bloodGroup as DashboardResponse["recommendedDonors"][number]["bloodGroup"],
        probabilityToDonate: d.probabilityToDonate,
      })),
      explainability: {
        highRecentDemand: Boolean(prediction?.explainHighRecentDemand ?? 0),
        lowInventory: Boolean(prediction?.explainLowInventory ?? 0),
        largeDonationGap: Boolean(prediction?.explainLargeDonationGap ?? 0),
      },
    };
  }

  async upsertDashboard(input: DashboardResponse): Promise<void> {
    const existingPrediction = await db.select().from(predictions).limit(1);

    if (existingPrediction.length === 0) {
      await db.insert(predictions).values({
        alertMessage: input.alertMessage,
        explainHighRecentDemand: input.explainability.highRecentDemand ? 1 : 0,
        explainLowInventory: input.explainability.lowInventory ? 1 : 0,
        explainLargeDonationGap: input.explainability.largeDonationGap ? 1 : 0,
      });
    } else {
      await db
        .update(predictions)
        .set({
          alertMessage: input.alertMessage,
          explainHighRecentDemand: input.explainability.highRecentDemand ? 1 : 0,
          explainLowInventory: input.explainability.lowInventory ? 1 : 0,
          explainLargeDonationGap: input.explainability.largeDonationGap ? 1 : 0,
        })
        .where(eq(predictions.id, existingPrediction[0].id));
    }

    await db.delete(inventoryStatuses);
    await db.delete(recommendedDonors);

    await db.insert(inventoryStatuses).values(
      Object.entries(input.inventory).map(([bloodGroup, status]) => ({
        bloodGroup,
        status,
      })),
    );

    await db.insert(recommendedDonors).values(
      input.recommendedDonors.map((d) => ({
        donorId: d.donorId,
        bloodGroup: d.bloodGroup,
        probabilityToDonate: d.probabilityToDonate,
      })),
    );
  }
}

export const storage = new DatabaseStorage();
