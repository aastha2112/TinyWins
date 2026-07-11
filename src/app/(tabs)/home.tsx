import CustomCalendarBar from "@/components/main/CustomCalendarBar";
import DailyAffirmation from "@/components/main/DailyAffirmation";
import DailyWinsHome from "@/components/main/DailyWinsHome";
import { CommonStyles } from "@/components/styles/CommonStyles";
import { Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useHabits } from "@/context/HabitsContext";

const Home = () => {
  const { user } = useAuth();
  const { habits, isLoading } = useHabits();
  const userName = user?.name?.split(" ")[0];

  return (
    <View>
      <Text style={CommonStyles.headingText}>Hi, {userName} !</Text>
      <CustomCalendarBar />
      <DailyAffirmation />
      {isLoading ? (
        <View>
          <Text>loading...</Text>
        </View>
      ) : (
        <DailyWinsHome habitsForToday={habits?.slice(0, 3)} />
      )}
    </View>
  );
};

export default Home;
