import CustomCalendarBar from "@/components/main/CustomCalendarBar";
import DailyAffirmation from "@/components/main/DailyAffirmation";
import DailyWinsHome from "@/components/main/DailyWinsHome";
import { CommonStyles } from "@/components/styles/CommonStyles";
import { Text, View } from "react-native";

const Home = () => {
  return (
    <View>
      <Text style={CommonStyles.headingText}>Hi, Aastha !</Text>
      <CustomCalendarBar/>
      <DailyAffirmation/>
      <DailyWinsHome/>
    </View>
  );
};

export default Home;
