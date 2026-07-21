import { useRouter } from "expo-router";
import { OnboardingStep } from "@/components/onboarding/OnboardingScreen";
import { LogoGlow } from "@/constants/images/images";

export default function App() {
  const router = useRouter();

  return (
    <>
    <OnboardingStep title={'Small steps count. Every time.'} body={`You don't have to do everything today. Just one small step is enough.`} buttonText={`Let's go`} activeDotIndex={0} imageSrc={LogoGlow} onButtonPress={()=>{router.push("/onboarding/SecondScreen")}}/>
    </>
  );
}

