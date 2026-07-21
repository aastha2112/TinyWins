import { useRouter } from "expo-router";
import { OnboardingStep } from "@/components/onboarding/OnboardingScreen";
import { LogoGlow } from "@/constants/images/images";

export default function App() {
  const router = useRouter();

  return (
    <>
    <OnboardingStep title={'Small steps count. Every time.'} body={`Progress isn't measured by giant leaps. It's built from small moments of showing up, again and again.`} buttonText={`Let's go`} activeDotIndex={0} imageSrc={LogoGlow} onButtonPress={()=>{router.push("/onboarding/SecondScreen")}}/>
    </>
  );
}

