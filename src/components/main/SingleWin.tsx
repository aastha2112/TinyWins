import { Pressable, Text, View } from 'react-native'
import { SingleWinStyles } from '../styles/SingleWinStyles'
import { Ionicons } from '@expo/vector-icons'
import { Habit } from '@/types/habit.types'
import { useState } from 'react'

interface SingleWinProps {
  habit: Habit
  isCompleted?: boolean
  onToggle?: (habitId: string) => void
}

const SingleWin = ({ habit, isCompleted = true, onToggle }: SingleWinProps) => {
  const handlePress = () => {
    onToggle?.(habit.id)
  }

  return (
    <View style={SingleWinStyles.winContainer}>
      <Text style={SingleWinStyles.winIcon}>{habit?.icon}</Text>

      <View style={SingleWinStyles.winTextCont}>
        <Text style={SingleWinStyles.winTitle}>{habit.title}</Text>
        {habit?.subtitle ? (
          <Text style={SingleWinStyles.winSubtitle}>{habit.subtitle}</Text>
        ) : null}
      </View>

      <Pressable onPress={handlePress} style={SingleWinStyles.checkboxContainer}>
        <Ionicons
          name={isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
          size={28}
          color={isCompleted ? '#4CAF50' : '#B0B0B0'}
        />
      </Pressable>
    </View>
  )
}

export default SingleWin