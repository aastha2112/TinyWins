import { apiClient } from "./api";


export const winsService = {

    async getWins(date?: string) {
        const query = date? `?date=${date}` : ''
        return await apiClient(`/wins${query}`);
      },
    
      async toggleWin(payload: any) {
        return await apiClient("/wins/toggle", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      },
}