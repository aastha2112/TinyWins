import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'; 

const DailyAffirmation = () => {
  return (
        <View style={styles.container}>
      <LinearGradient colors={['yellow', '#FFD6BA', 'orange']} start={{x: 0, y: 0}} end={{x:1, y:1}} style={styles.container}>
        <Text style={styles.quote}>Never Give Up !</Text>
      </LinearGradient>
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
        borderRadius: 20,
        marginTop: 15
    },
    quote: {
        fontSize: 20,
        fontWeight: 500,
        fontStyle: 'italic',
        color: '#000',
        letterSpacing: 0.5
    }
})