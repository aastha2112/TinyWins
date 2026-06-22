import { createNativeStackNavigator } from "expo-router/build/react-navigation/native-stack";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [winText, setWinText] = useState("");
  const [tinyWins, setTinyWins] = useState([
    { id: 1, win: "Drink Water" },
    { id: 2, win: "jogging" },
    { id: 3, win: "running" },
    { id: 4, win: "Study" },
    { id: 5, win: "Music" },
  ]);

  const handleAddTinyWin = (winText: string) => {
    return [...tinyWins, { id: Date.now(), win: winText }];
  };

  const WinsList = () => {
    return (
      <FlatList
        data={tinyWins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("Details")}>
              <Text>{item.win}</Text>
              <Text>{"->"}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>

      {/* now */}

      {/* now */}
    </SafeAreaView>
  );
};

export default HomeScreen;
