import { StyleSheet, Text, View } from "react-native";

const FinalScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Final Screen</Text>
    </View>
  );
};

export default FinalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "red",
  },
});
