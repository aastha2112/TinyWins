import { Text, View } from 'react-native'
import { CommonStyles } from '../styles/CommonStyles'
import SingleWin from './SingleWin'

const DailyWinsHome = () => {
  return (
    <View style={{marginHorizontal: 4, marginTop: 20}}>
        <Text style={[CommonStyles.subHeadingText, {color: 'black', marginBottom: 10}]}>Daily Wins</Text>
        <View style={[CommonStyles.screenViewContainer, { gap: 14, width: '100%'}]}>
       
       <SingleWin/>
       <SingleWin/>
       <SingleWin/>

        </View>
    </View>
  )
}

export default DailyWinsHome