import { Pressable, Text, View } from 'react-native'
import SingleWin from '../main/SingleWin'
import { CommonStyles } from '../styles/CommonStyles'
import { Habit } from '@/types/habit.types'
import { useHabits } from '@/context/HabitsContext'
import { useRouter } from 'expo-router'

const AllHabits = ({ habitsForToday }: { habitsForToday: Habit[] }) => {
  const { todaysWins, toggleHabitToday } = useHabits()
  const router = useRouter()

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[CommonStyles.subHeadingText, { color: '#222', marginBottom: 12, fontWeight: '800' }]}>
        Goals
      </Text>
      <View style={{ width: '100%', gap: 12 }}>
        {habitsForToday.length !== 0 ? (
          habitsForToday.map((habit: any) => (
            <Pressable key={habit.id} onPress={() => router.push(`/edit-habit/${habit.id}`)}>
              <SingleWin
                habit={habit}
                isCompleted={todaysWins.includes(habit.id)}
                onToggle={toggleHabitToday}
              />
            </Pressable>
          ))
        ) : (
          <Text style={{ color: '#999' }}>No habits created yet!</Text>
        )}
      </View>
    </View>
  )
}

export default AllHabits