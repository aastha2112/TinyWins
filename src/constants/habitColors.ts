export const HABIT_COLORS = [
    '#FF6B81', // coral pink
    '#31C48D', // mint green
    '#FFB020', // warm amber
    '#4FA8FF', // sky blue
    '#9B7EDE', // lavender
    '#FF8C42', // peach orange
  ]
  
  // Appends an alpha channel to a hex color. opacity: 0-1
  export const withOpacity = (hex: string, opacity: number) => {
    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, '0')
    return `${hex}${alpha}`
  }