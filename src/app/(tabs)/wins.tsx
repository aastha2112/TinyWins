import AllHabits from "@/components/habits/AllHabits";
import { useHabits } from "@/context/HabitsContext";
import { Text, View } from "react-native";

const Wins = () => {
  const {habits, isLoading} = useHabits()
  return (
    <View>
      <Text>Wins</Text>
      { isLoading? <View>
        <Text>loading...</Text>
      </View> : <AllHabits habitsForToday={habits}/>}
    </View>
  );
};

export default Wins;
