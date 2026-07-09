import { apiClient } from "./api";

export const habitService = {
  async getHabits() {
    return await apiClient("/habits");
  },

  async createHabit(payload: any) {
    return await apiClient("/habits", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateHabit(id: string, payload: any) {
    return await apiClient(`/habits/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async getOnetHabit(id: string) {
    return await apiClient(`/habits/${id}`);
  },

  async deleteHabit(id: string) {
    return await apiClient(`/habits/${id}`, {
      method: "DELETE",
    });
  },
};
