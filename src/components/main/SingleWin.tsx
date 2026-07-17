import { Pressable, Text, View } from 'react-native'
import { SingleWinStyles as styles } from '../styles/SingleWinStyles'
import { Ionicons } from '@expo/vector-icons'
import { Habit } from '@/types/habit.types'
import { withOpacity } from '@/constants/habitColors'

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] 

interface SingleWinProps {
  habit: Habit
  isCompleted?: boolean
  onToggle?: (habitId: string) => void
}

const SingleWin = ({ habit, isCompleted = false, onToggle }: SingleWinProps) => {
  const handlePress = () => {
    onToggle?.(habit.id)
  }

  const frequency = habit.frequency ?? []
  const color = habit.color || '#999'
  const streak = (habit as any).currentStreak ?? 0

  return (
    <View style={[styles.card, { backgroundColor: withOpacity(color, 0.14) }]}>
      <View style={[styles.iconBubble, { backgroundColor: color }]}>
        <Text style={styles.iconText}>{habit?.icon}</Text>
      </View>

      <View style={styles.textCol}>
        <Text style={styles.title} numberOfLines={1}>{habit.title}</Text>
        {habit?.subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>{habit.subtitle}</Text>
        ) : null}

        <View style={styles.dayRow}>
          {DAY_LABELS.map((label, idx) => {
            const active = frequency.includes(idx)
            return (
              <View
                key={idx}
                style={[
                  styles.dayDot,
                  active && { backgroundColor: color, width: 18, height: 18, borderRadius: 9 },
                ]}
              >
                {active && <Text style={styles.dayDotText}>{label}</Text>}
              </View>
            )
          })}
        </View>
      </View>

      <View style={styles.rightCol}>
        {streak > 0 && (
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={13} color="#FF7A45" />
            <Text style={styles.streakText}>{streak}</Text>
          </View>
        )}
        <Pressable onPress={handlePress} hitSlop={10} style={styles.checkboxContainer}>
          <Ionicons
            name={isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
            size={32}
            color={isCompleted ? color : '#C9C9C9'}
          />
        </Pressable>
      </View>
    </View>
  )
}

export default SingleWin