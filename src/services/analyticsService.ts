import { apiClient } from "./api";

export const analyticsService = {
  async getAnalytics() {
    return await apiClient("/analytics");
  }
};