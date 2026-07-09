import { apiClient } from "./api";

export const habitService = {
  async getHabits() {
    await apiClient("/habits");
  },

  async createHabit(payload: any) {
    await apiClient("/habits", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateHabit(id: string, payload: any) {
    await apiClient(`/habits/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async geOnetHabit(id: string) {
    await apiClient(`/habits/${id}`);
  },

  async deleteHabit(id: string) {
    await apiClient(`/habits/${id}`, {
      method: "DELETE",
    });
  },
};
