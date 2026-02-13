import { z } from "zod";

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// DOMAIN SCHEMAS
// ============================================

export const bloodGroupSchema = z.enum(["A+", "B+", "O+", "O-", "AB+"]);

export const inventoryStatusSchema = z.enum([
  "Sufficient",
  "Low",
  "Critical",
]);

export const donorRecommendationSchema = z.object({
  donorId: z.string(),
  bloodGroup: bloodGroupSchema,
  probabilityToDonate: z.number().int().min(0).max(100),
});

export const dashboardResponseSchema = z.object({
  alertMessage: z.string(),
  inventory: z.record(bloodGroupSchema, inventoryStatusSchema),
  recommendedDonors: z.array(donorRecommendationSchema),
  explainability: z.object({
    highRecentDemand: z.boolean(),
    lowInventory: z.boolean(),
    largeDonationGap: z.boolean(),
  }),
});

// ============================================
// API CONTRACT
// ============================================

export const api = {
  dashboard: {
    get: {
      method: "GET" as const,
      path: "/api/dashboard" as const,
      responses: {
        200: dashboardResponseSchema,
      },
    },
  },
};

// ============================================
// REQUIRED: buildUrl helper
// ============================================
export function buildUrl(
  path: string,
  params?: Record<string, string | number>,
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPE HELPERS
// ============================================
export type DashboardResponse = z.infer<
  typeof api.dashboard.get.responses[200]
>;
