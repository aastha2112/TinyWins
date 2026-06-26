import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const FinalScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Final Screen</Text>
      <Pressable onPress={() => router.replace("/Home")}>
        <Text style={styles.text}>Next</Text>
      </Pressable>
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
