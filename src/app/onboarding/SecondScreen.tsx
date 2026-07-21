import { useRouter } from "expo-router";
import { OnboardingStep } from "@/components/onboarding/OnboardingScreen";
import { LogoGlow } from "@/constants/images/images";

export default function OnboardingTwo() {
  const router = useRouter();

  return (
    <>
    <OnboardingStep title={`You don't have to be perfect.`} body={`Growth isn't a straight line. Some days are easier than others, and that's okay. Every small step still counts.`} buttonText={`Continue`} activeDotIndex={1} imageSrc={LogoGlow} onButtonPress={()=>{router.push("/onboarding/FinalScreen")}}/>
    </>
  );
}
