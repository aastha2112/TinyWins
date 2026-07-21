import { useRouter } from "expo-router";
import { OnboardingStep } from "@/components/onboarding/OnboardingScreen";
import { LogoGlow } from "@/constants/images/images";

export default function OnboardingTwo() {
  const router = useRouter();

  return (
    <>
    <OnboardingStep title={`Perfection isn't the goal.`} body={`Growth isn't a straight line, and you don't have to start from scratch every time life happens.`} buttonText={`Continue`} activeDotIndex={1} imageSrc={LogoGlow} onButtonPress={()=>{router.push("/onboarding/FinalScreen")}}/>
    </>
  );
}
