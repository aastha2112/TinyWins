import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Details = () => {
  const { id, winText } = useLocalSearchParams();
  const router = useRouter();
  return (
    <SafeAreaView>
      <View>
        <Text>YOUR TINY WINS !!</Text>

        <Text>{winText}</Text>
        <Text>{id}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>{"<-"}Go back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Details;
