import { useRouter } from "expo-router";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { onboardingStyles } from "./styles/OnboardingScreenStyles";

const AuthButtonsModal = ({
  visible,
  onPress,
}: {
  visible: boolean | undefined;
  onPress: () => void;
}) => {
  const router = useRouter();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onPress}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[onboardingStyles.title, { width: "65%" }]}>
            Start your journey
          </Text>
          <Text style={[onboardingStyles.subtitle, { width: "65%" }]}>
            Track your goals, complete daily tasks, and stay focused{" "}
          </Text>
          <Pressable
            style={onboardingStyles.button}
            onPress={() => router.push("/Register")}
          >
            <Text style={onboardingStyles.buttonText}>Register</Text>
          </Pressable>
          <Pressable
            style={onboardingStyles.button}
            onPress={() => router.push("/Login")}
          >
            <Text style={onboardingStyles.buttonText}>Login</Text>
          </Pressable>
          {/* <Pressable onPress={onPress}>
            <Text>Go Back</Text>
          </Pressable> */}
          <Text
            style={[onboardingStyles.subtitle, { width: "65%", fontSize: 10 }]}
          >
            By continuing, you agree to our Terms of Use and Privacy Policy
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default AuthButtonsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    shadowColor: "blue",
    width: "100%",
    height: "40%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.5,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
