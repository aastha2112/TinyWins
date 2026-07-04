import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DailyAffirmation = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.quote}>Never Give Up !</Text>
    </View>
  )
}

export default DailyAffirmation


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 150,
        backgroundColor: '#FFD6BA',
        borderRadius: 20,
        marginTop: 20
    },
    quote: {
        fontSize: 16,
        fontWeight: 500,
        fontStyle: 'italic',
        color: '#000',
        letterSpacing: 0.5
    }
})