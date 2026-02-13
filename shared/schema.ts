import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// =======================================================
// DATA MODEL
// =======================================================
// Academic prototype for:
// "Intelligent Blood Demand & Donor Availability Prediction System"
//
// NOTE: This app intentionally uses dummy/static data only.
// Schema exists to provide a stable API contract for the dashboard UI.

export const predictions = pgTable("predictions", {
  id: serial("id").primaryKey(),
  alertMessage: text("alert_message").notNull(),
  explainHighRecentDemand: integer("explain_high_recent_demand").notNull(),
  explainLowInventory: integer("explain_low_inventory").notNull(),
  explainLargeDonationGap: integer("explain_large_donation_gap").notNull(),
});

export const inventoryStatuses = pgTable("inventory_statuses", {
  id: serial("id").primaryKey(),
  bloodGroup: text("blood_group").notNull(),
  status: text("status").notNull(),
});

export const recommendedDonors = pgTable("recommended_donors", {
  id: serial("id").primaryKey(),
  donorId: text("donor_id").notNull(),
  bloodGroup: text("blood_group").notNull(),
  probabilityToDonate: integer("probability_to_donate").notNull(),
});

// =======================================================
// ZOD SCHEMAS (insert)
// =======================================================

export const insertPredictionSchema = createInsertSchema(predictions).omit({
  id: true,
});

export const insertInventoryStatusSchema = createInsertSchema(
  inventoryStatuses,
).omit({
  id: true,
});

export const insertRecommendedDonorSchema = createInsertSchema(
  recommendedDonors,
).omit({
  id: true,
});

// =======================================================
// EXPLICIT API CONTRACT TYPES
// =======================================================

// Base types
export type Prediction = typeof predictions.$inferSelect;
export type InventoryStatus = typeof inventoryStatuses.$inferSelect;
export type RecommendedDonor = typeof recommendedDonors.$inferSelect;

// Insert types
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type InsertInventoryStatus = z.infer<typeof insertInventoryStatusSchema>;
export type InsertRecommendedDonor = z.infer<typeof insertRecommendedDonorSchema>;

// Request types
export type CreatePredictionRequest = InsertPrediction;
export type CreateInventoryStatusRequest = InsertInventoryStatus;
export type CreateRecommendedDonorRequest = InsertRecommendedDonor;

export type UpdatePredictionRequest = Partial<InsertPrediction>;
export type UpdateInventoryStatusRequest = Partial<InsertInventoryStatus>;
export type UpdateRecommendedDonorRequest = Partial<InsertRecommendedDonor>;

// Response types
export type DashboardResponse = {
  alertMessage: string;
  inventory: Record<string, "Sufficient" | "Low" | "Critical">;
  recommendedDonors: Array<{
    donorId: string;
    bloodGroup: string;
    probabilityToDonate: number;
  }>;
  explainability: {
    highRecentDemand: boolean;
    lowInventory: boolean;
    largeDonationGap: boolean;
  };
};
