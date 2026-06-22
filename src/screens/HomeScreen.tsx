import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const router = useRouter();
  const [winText, setWinText] = useState("");
  const [tinyWins, setTinyWins] = useState([
    { id: 1, win: "Drink Water" },
    { id: 2, win: "jogging" },
    { id: 3, win: "running" },
    { id: 4, win: "Study" },
    { id: 5, win: "Music" },
  ]);

  const handleAddTinyWin = () => {
    [...tinyWins, { id: Date.now(), win: winText }];
    setWinText("");
  };

  const WinsList = () => {
    return (
      <FlatList
        data={tinyWins}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/details",
                  params: { id: item.id, winText: item.win },
                })
              }
            >
              <Text>{item.win}</Text>
              <Text>{"->"}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const AddWinForm = () => {
    return (
      <SafeAreaView>
        <View>
          <Text>Start Adding Tiny Wins !!</Text>
        </View>
        <View>
          <TextInput
            placeholder="Tiny Goal"
            value={winText}
            onChangeText={setWinText}
          />
        </View>
        <TouchableOpacity onPress={handleAddTinyWin}>
          <Text>Add</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>

      {/* now */}

      <WinsList />
      <AddWinForm />
      {/* now */}
    </SafeAreaView>
  );
};

export default HomeScreen;
