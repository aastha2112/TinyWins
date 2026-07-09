export interface Habit {
    id: string
    title: string
    icon?: string
    color?: string
    frequency?: number[]
    isActive: boolean
    createdAt: string
    userId: string
  }