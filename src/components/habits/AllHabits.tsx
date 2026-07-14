import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import SingleWin from '../main/SingleWin'
import { CommonStyles } from '../styles/CommonStyles'
import { Habit } from '@/types/habit.types'
import { useHabits } from '@/context/HabitsContext'
import { useRouter } from 'expo-router'

 
const AllHabits = ({habitsForToday}: {habitsForToday: Habit[]}) => {
  const {todaysWins, toggleHabitToday} = useHabits()
  const router = useRouter()

    return (
      <View style={{marginHorizontal: 4, marginTop: 20}}>
          <Text style={[CommonStyles.subHeadingText, {color: 'black', marginBottom: 10}]}>Goals</Text>
          <View style={[CommonStyles.screenViewContainer, { gap: 14, width: '100%'}]}>
          {
            habitsForToday.length !== 0 ? (
              habitsForToday.map((habit: any)=>{
                return( 
                <Pressable key={habit.id} onPress={() => router.push(`/edit-habit/${habit.id}`)}>
                <SingleWin habit={habit} isCompleted={todaysWins.includes(habit.id)} onToggle={toggleHabitToday}/>
              </Pressable>
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

export default AllHabits