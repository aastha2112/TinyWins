import { Pressable, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import SingleWin from '../main/SingleWin'
import { CommonStyles } from '../styles/CommonStyles'
import { Habit } from '@/types/habit.types'
import { useHabits } from '@/context/HabitsContext'
import { useRouter } from 'expo-router'

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const PLACEHOLDER_COLOR = '#C9C9C9'

const PLACEHOLDERS = [
  { title: 'Drink Water', icon: '💧', days: [1, 3, 5] },
  { title: 'Read 10 min', icon: '📖', days: [0, 2, 4] },
  { title: 'Stretch', icon: '🏃‍♀️', days: [1, 3, 5] },
]

const PlaceholderCard = ({ title, icon, days }: { title: string; icon: string; days: number[] }) => (
  <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: 20, padding: 16, backgroundColor: '#E8E8E8', opacity: 0.4 }}>
    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#D8D8D8', justifyContent: 'center', alignItems: 'center', marginRight: 14 }}>
      <Text style={{ fontSize: 22 }}>{icon}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: '700', color: '#232323', letterSpacing: 0.2 }}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 5, marginTop: 8 }}>
        {DAY_LABELS.map((label, idx) => {
          const active = days.includes(idx)
          return (
            <View key={idx} style={{ width: active ? 18 : 6, height: active ? 18 : 6, borderRadius: active ? 9 : 3, backgroundColor: active ? PLACEHOLDER_COLOR : '#D8D8D8', justifyContent: 'center', alignItems: 'center' }}>
              {active && <Text style={{ fontSize: 9, fontWeight: '700', color: '#fff' }}>{label}</Text>}
            </View>
          )
        })}
      </View>
    </View>
    <View style={{ alignItems: 'center', marginLeft: 8 }}>
      <Ionicons name="ellipse-outline" size={32} color="#C9C9C9" />
    </View>
  </View>
)

const AllHabits = ({ habitsForToday }: { habitsForToday: Habit[] }) => {
  const { todaysWins, toggleHabitToday } = useHabits()
  const router = useRouter()

  return (
    <View style={{ marginTop: 20 }}>
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
          <View style={{ gap: 50 }}>
            <View style={{ width: '100%', gap: 12 }}>
              {PLACEHOLDERS.map((p, i) => (
                <PlaceholderCard key={i} title={p.title} icon={p.icon} days={p.days} />
              ))}
            </View>
            <Text style={{ color: '#555', textAlign: 'center', marginTop: 44, fontSize: 15, fontStyle: 'italic', width: '50%', margin: 'auto' , lineHeight: 22}}>
              Create your first habit to start filling this space.
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default AllHabits