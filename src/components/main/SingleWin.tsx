import { Text, View } from 'react-native'
import { SingleWinStyles } from '../styles/SingleWinStyles'
import { Ionicons } from '@expo/vector-icons'
import { Habit } from '@/types/habit.types'

const SingleWin = ({habit, isCompleted, onToggle}: {habit: Habit, isCompleted: boolean, onToggle: ()=> void}) => {
  return (
    
        <View style={SingleWinStyles.winContainer}>
            <Text>{habit?.icon}</Text>
            <View style={SingleWinStyles.winTextCont}>
            <Text style={SingleWinStyles.winTitle}>{habit.title}</Text>
            {habit?.subtitle ? <Text style={SingleWinStyles.winSubtitle}>{habit?.subtitle}</Text> : null}
            </View>
            <View style={SingleWinStyles.winWin}>
            <Ionicons name={isCompleted ? 'checkmark-circle' : 'ellipse-outline'}/>
            </View>
        </View>
  )
}

export default SingleWin
