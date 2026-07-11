import { Text, View } from 'react-native'
import { CommonStyles } from '../styles/CommonStyles'
import SingleWin from './SingleWin'
import { Habit } from '@/types/habit.types'
import { useHabits } from '@/context/HabitsContext'

const DailyWinsHome = ({habitsForToday}: {habitsForToday: Habit[]}) => {
  const {toggleHabitToday, todaysWins} = useHabits()
  return (
    <View style={{marginHorizontal: 4, marginTop: 20}}>
        <Text style={[CommonStyles.subHeadingText, {color: 'black', marginBottom: 10}]}>Daily Wins</Text>
        <View style={{gap: 10}}>

        {
          habitsForToday?.length ? (
            habitsForToday?.map((habit: any)=>{
              return (
                <SingleWin habit={habit} key={habit.id} isCompleted={todaysWins.includes(habit.id)} onToggle={toggleHabitToday}/>
              )
            })
          ): (
            <View>
              <Text>No habits created yet!</Text>
            </View>
          )
        }
        </View>


    </View>
  )
}

export default DailyWinsHome