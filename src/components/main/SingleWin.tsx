import { Text, View } from 'react-native'
import { SingleWinStyles } from '../styles/SingleWinStyles'
import { Ionicons } from '@expo/vector-icons'
import { Habit } from '@/types/habit.types'

const SingleWin = ({habit}: {habit: Habit}) => {
  console.log(habit, 'from singlewin')
  return (
    
        <View style={SingleWinStyles.winContainer}>
            <Text>{habit?.icon}</Text>
            <View style={SingleWinStyles.winTextCont}>
            <Text style={SingleWinStyles.winTitle}>{habit.title}</Text>
            <Text style={SingleWinStyles.winSubtitle}>{habit?.subtitle}</Text>
            </View>
            <View style={SingleWinStyles.winWin}>
              <Text>{habit?.icon}</Text>
            </View>
        </View>
  )
}

export default SingleWin
