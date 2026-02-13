import { useQuery } from "@tanstack/react-query";
import { api, type DashboardResponse } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useDashboard() {
  return useQuery<DashboardResponse>({
    queryKey: [api.dashboard.get.path],
    queryFn: async () => {
      const res = await fetch(api.dashboard.get.path, { credentials: "include" });
      if (!res.ok) throw new Error(`Failed to fetch dashboard (${res.status})`);
      const json = await res.json();
      return parseWithLogging(api.dashboard.get.responses[200], json, "dashboard.get");
    },
  });
}
