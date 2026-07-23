import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomCalendarBar from "@/components/main/CustomCalendarBar";
import DailyAffirmation from "@/components/main/DailyAffirmation";
import DailyWinsHome from "@/components/main/DailyWinsHome";
import { CommonStyles } from "@/components/styles/CommonStyles";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useHabits } from "@/context/HabitsContext";

const Home = () => {
  const { user } = useAuth();
  const { habits, isLoading } = useHabits();
  const router = useRouter();
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
        ) : habits.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#222', textAlign: 'center' }}>
              Every journey starts somewhere.
            </Text>
            <Text style={{ fontSize: 15, color: '#555', textAlign: 'center', marginTop: 10, lineHeight: 22 }}>
              Today is a great day for your first tiny win.
            </Text>
            <Pressable
              onPress={() => router.push('/create-habit')}
              style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, backgroundColor: '#FFD43B', marginTop: 30 }}
            >
              <Ionicons name="add" size={18} color="#000" style={{ marginTop: 1 }} />
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#000', marginLeft: 6 }}>Create a tiny goal</Text>
            </Pressable>
          </View>
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