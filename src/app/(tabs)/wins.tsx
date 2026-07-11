import AllHabits from "@/components/habits/AllHabits";
import { useHabits } from "@/context/HabitsContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const Wins = () => {
  const {habits, isLoading} = useHabits()
  const router = useRouter()

  console.log('all habits', habits.length)
  return (
    <>
    <View style={{position: 'relative'}}>
      <Text>Wins</Text>
      { isLoading? <View>
        <Text>loading...</Text>
      </View> : <AllHabits habitsForToday={habits}/>}
    </View>
    <Pressable style={{position: 'absolute', bottom: 120, right: 10, backgroundColor: 'yellow', width: 70, height: 70, borderRadius: 35, justifyContent: "center", alignItems: 'center' }} onPress={() => router.push('/create-habit')}>
   <Ionicons name="add" size={40} color={'black'}/>

    </Pressable>
    </>
  );
};

export default Wins;
