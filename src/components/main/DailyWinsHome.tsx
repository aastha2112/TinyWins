import { Text, View } from 'react-native'
import { CommonStyles } from '../styles/CommonStyles'
import SingleWin from './SingleWin'
import { Habit } from '@/types/habit.types'

const DailyWinsHome = ({habitsForToday}: {habitsForToday: Habit[]}) => {
  console.log(habitsForToday, 'today habits')
  return (
    <View style={{marginHorizontal: 4, marginTop: 20}}>
        <Text style={[CommonStyles.subHeadingText, {color: 'black', marginBottom: 10}]}>Daily Wins</Text>
        <View style={[CommonStyles.screenViewContainer, { gap: 14, width: '100%'}]}>
        {
          habitsForToday.length !== 0 ? (
            habitsForToday.map((habit: any)=>{
              return <SingleWin habit={habit} key={habit.id}/>
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