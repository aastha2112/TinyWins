import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoGlow from "../../../assets/images/logo-glow.png";

const SecondScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Small Wins, Big Impact</Text>
        <Text style={styles.subtitle}>
          Build momentum, one task at a time. It's about showing up, not doing
          it all.
        </Text>
        <Text style={styles.subtitle}>Celebrate showing up today.</Text>

        <Image source={LogoGlow} style={styles.logo} />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => router.push("/onboarding/FinalScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    paddingVertical: 50,
    paddingHorizontal: 22,
  },
  title: {
    color: "black",
    fontSize: 28,
    fontWeight: "800",
    width: "80%",
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
    width: "80%",
  },
  logo: {
    width: 450,
    height: 450,
    marginTop: 20,
    resizeMode: "contain",
  },
  buttonContainer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  button: {
    width: "60%",
    backgroundColor: "pink",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
});
