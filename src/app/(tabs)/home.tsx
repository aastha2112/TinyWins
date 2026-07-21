import CustomCalendarBar from "@/components/main/CustomCalendarBar";
import DailyAffirmation from "@/components/main/DailyAffirmation";
import DailyWinsHome from "@/components/main/DailyWinsHome";
import { CommonStyles } from "@/components/styles/CommonStyles";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useHabits } from "@/context/HabitsContext";

const Home = () => {
  const { user } = useAuth();
  const { habits, isLoading } = useHabits();
  const userName = user?.name?.split(" ")[0];

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={CommonStyles.headingText}>Hi, {userName} !</Text>
        <CustomCalendarBar />
        <DailyAffirmation />
        {isLoading ? (
          <Text style={{ color: '#999', marginTop: 20 }}>Loading...</Text>
        ) : (
          <DailyWinsHome habitsForToday={habits} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
});