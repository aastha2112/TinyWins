import { Pressable, Text } from "react-native";
import { onboardingStyles } from "./styles/OnboardingScreenStyles";

const OnboardingButton = ({
  children,
  onPress,
  style,
}: {
  children: any;
  onPress: () => void;
  style: any;
}) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Text style={onboardingStyles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default OnboardingButton;
