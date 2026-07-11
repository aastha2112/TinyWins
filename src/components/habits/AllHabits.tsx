import React from 'react'
import { Text, View } from 'react-native'
import SingleWin from '../main/SingleWin'
import { CommonStyles } from '../styles/CommonStyles'
import { Habit } from '@/types/habit.types'

 
const AllHabits = ({habitsForToday}: {habitsForToday: Habit[]}) => {
    return (
      <View style={{marginHorizontal: 4, marginTop: 20}}>
          <Text style={[CommonStyles.subHeadingText, {color: 'black', marginBottom: 10}]}>Goals</Text>
          <View style={[CommonStyles.screenViewContainer, { gap: 14, width: '100%'}]}>
          {
            habitsForToday.length !== 0 ? (
              habitsForToday.map((habit: any)=>{
                return <SingleWin habit={habit} isCompleted={true} onToggle={()=>{}} key={habit.id}/>
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

export default AllHabits