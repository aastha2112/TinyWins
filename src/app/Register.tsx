import { Label, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmed: "",
  });
  const router = useRouter();

  return (
    <SafeAreaView>
      <View>
        <Text>Register Here!</Text>
        <Label>Name</Label>
        <TextInput value={user.name} placeholder="Full Name" />
        <Label>Email</Label>
        <TextInput value={user.email} placeholder="Email address" />
        <Label>Create Password</Label>
        <TextInput value={user.password} placeholder="Create Password" />
        <Label>Confirm Password</Label>
        <TextInput value={user.confirmed} placeholder="Confirm Password" />
        <Pressable onPress={() => router.push("/Home")}>
          <Text>Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Register;
