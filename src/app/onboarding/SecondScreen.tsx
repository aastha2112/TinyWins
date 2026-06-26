import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const SecondScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Second Screen</Text>
      <Pressable onPress={() => router.push("/onboarding/FinalScreen")}>
        <Text style={styles.text}>Next</Text>
      </Pressable>
    </View>
  );
};

export default SecondScreen;

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
