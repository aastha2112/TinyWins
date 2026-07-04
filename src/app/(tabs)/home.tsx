import CustomCalendarBar from "@/components/main/CustomCalendarBar";
import DailyAffirmation from "@/components/main/DailyAffirmation";
import DailyWinsHome from "@/components/main/DailyWinsHome";
import { CommonStyles } from "@/components/styles/CommonStyles";
import { Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const {user} = useAuth()
  const userName = user?.name?.split(' ')[0]
  console.log(userName, 'user')
  return (
    <View>
      <Text style={CommonStyles.headingText}>Hi, {userName} !</Text>
      <CustomCalendarBar/>
      <DailyAffirmation/>
      <DailyWinsHome/>
    </View>
  );
};

export default Home;
