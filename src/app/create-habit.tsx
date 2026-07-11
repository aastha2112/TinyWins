import { CommonStyles } from '@/components/styles/CommonStyles'
import { Ionicons } from '@expo/vector-icons'
import { Label } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const createHabitForm = () => {
  return (
    <SafeAreaView style={CommonStyles.screenSafeView}>
    <View style={styles.formWrapper}>

    {/* image/icon static */}
    <Ionicons name='calendar' size={50} color={'#fff'} style={{marginBottom: 10}} />

{/* form */}


    <Label>New Habit</Label>
    <TextInput placeholder='Morning Meditation' style={styles.inputField}/>

    <Label>Note (optional)</Label>
    <TextInput placeholder='notes' style={styles.inputField} />

    <Label>Repeat Days</Label>
    <View style={styles.wrapper}>
        <Pressable> <Text>M </Text> </Pressable>
        <Pressable> <Text>T </Text> </Pressable>
        <Pressable> <Text>W </Text> </Pressable>
        <Pressable> <Text>T </Text> </Pressable>
        <Pressable> <Text>F </Text> </Pressable>
        <Pressable> <Text>S </Text> </Pressable>
        <Pressable> <Text>S </Text> </Pressable>
    </View>

    <Label>Icon</Label>
    <View style={styles.wrapper}>
        <Pressable> <Text>💧 </Text> </Pressable>
        <Pressable> <Text>🏃 </Text> </Pressable>
        <Pressable> <Text>📚 </Text> </Pressable>
        <Pressable> <Text>🧘</Text> </Pressable>
        <Pressable> <Text>💪  </Text> </Pressable>
        <Pressable> <Text>🎨 </Text> </Pressable>
        <Pressable> <Text>🥗 </Text> </Pressable>
        <Pressable> <Text>🎵 </Text> </Pressable>
    </View>

    <Label>Color</Label>
    <View style={styles.wrapper}>
        <Pressable> <View style={[styles.colors, {backgroundColor: 'lightpink'}]}> </View> </Pressable>
        <Pressable> <View style={[styles.colors, {backgroundColor: 'lightgreen'}]}>  </View> </Pressable>
        <Pressable> <View style={[styles.colors, {backgroundColor: 'yellow'}]}>  </View> </Pressable>
    </View>

    </View>


</SafeAreaView>
  )
}

export default createHabitForm


const styles= StyleSheet.create({
    formWrapper: {},
    wrapper: {
        flexDirection: 'row',
        gap: 10
    },
    label: {},
    inputField: {},
    button: {},
    iconsCont: {},
    icons: {},
    colorsCont: {},
    colors: {
        height: 25,
        width: 25,
    }
})