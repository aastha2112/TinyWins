import AllHabits from "@/components/habits/AllHabits";
import { useHabits } from "@/context/HabitsContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Wins = () => {
  const { habits, isLoading } = useHabits();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!isLoading && (
          <Text style={styles.headerTitle}>{habits.length > 0 ? 'Your wins' : 'Your wins will live here.'}</Text>
        )}

        {isLoading ? (
          <Text style={{ color: '#999', marginTop: 20 }}>Loading...</Text>
        ) : (
          <AllHabits habitsForToday={habits} />
        )}
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => router.push('/create-habit')}>
        <Ionicons name="add" size={30} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
};

export default Wins;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 140,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#222',
  },
  fab: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
});