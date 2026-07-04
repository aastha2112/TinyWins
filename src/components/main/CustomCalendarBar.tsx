import { useState } from 'react'
import { Text, View } from 'react-native'
import { CommonStyles } from '../styles/CommonStyles'

const CustomCalendarBar = () => {
    const date = new Date()
    const dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayToday = dayArr[date.getDay()-1] 
    const dateToday = date.getDate()
    const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const presentMonth = fullMonths[date.getMonth()-1]
    const year = date.getFullYear()


  return (
    <View>
        <Text style={CommonStyles.subHeadingText}>{`${dayToday} ${dateToday} ${presentMonth} ${year}`}</Text>
    </View>
  )
}

export default CustomCalendarBar