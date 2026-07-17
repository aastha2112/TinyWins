import { Text, View } from 'react-native'
import { CommonStyles } from '../styles/CommonStyles'
import SingleWin from './SingleWin'
import { Habit } from '@/types/habit.types'
import { useHabits } from '@/context/HabitsContext'

const DailyWinsHome = ({ habitsForToday }: { habitsForToday: Habit[] }) => {
  const { toggleHabitToday, todaysWins } = useHabits()

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[CommonStyles.subHeadingText, { color: '#222', marginBottom: 12, fontWeight: '800' }]}>
        Daily Wins
      </Text>
      <View style={{ width: '100%', gap: 12 }}>
        {habitsForToday.length !== 0 ? (
          habitsForToday.map((habit: any) => (
            <SingleWin
              habit={habit}
              key={habit.id}
              isCompleted={todaysWins.includes(habit.id)}
              onToggle={toggleHabitToday}
            />
          ))
        ) : (
          <Text style={{ color: '#999' }}>No habits scheduled for today — enjoy the rest!</Text>
        )}
      </View>
    </View>
  )
}

export default DailyWinsHome