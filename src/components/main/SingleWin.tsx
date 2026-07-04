import { Text, View } from 'react-native'
import { SingleWinStyles } from '../styles/SingleWinStyles'
import { Ionicons } from '@expo/vector-icons'

const SingleWin = () => {
  return (
    
        <View style={SingleWinStyles.winContainer}>
            <Ionicons name='home' size={40} color={'coral'}/>
            <View style={SingleWinStyles.winTextCont}>
            <Text style={SingleWinStyles.winTitle}>Win of the day</Text>
            <Text style={SingleWinStyles.winSubtitle}>Win of the day subtitle if any</Text>
            </View>
            <View style={SingleWinStyles.winWin}>
            <Ionicons name='add-circle-outline' size={20} color={'#808080'}/>
            </View>
        </View>
  )
}

export default SingleWin
