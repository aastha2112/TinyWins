import { CommonStyles } from "@/components/styles/CommonStyles";
import { authService } from "@/services/authService";
import { Label, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmed: "",
  });
  const router = useRouter();

  const handleRegister = async()=>{
    setLoading(true)
    try{

      if(user.password !== user.confirmed){
        Alert.alert("Password doesn't match")
        return
      }

      const payload = {
        name: user.name,
        email: user.email,
        password: user.password
      }
      await authService.register(payload)
      Alert.alert('Signup Successful !!')

      await router.push('/Login')
    }catch (err){
      console.log(err, 'Register not working')
    }
  }

  return (
    <SafeAreaView style={CommonStyles.screenSafeView}>
      <View style={CommonStyles.screenViewContainer}>
        <Text>Register Here!</Text>
        <Label>Name</Label>
        <TextInput value={user.name} placeholder="Full Name" onChangeText={(text)=>setUser({...user, name: text})} />
        <Label>Email</Label>
        <TextInput value={user.email} placeholder="Email address" onChangeText={(text)=>setUser({...user, email: text})}/>
        <Label>Create Password</Label>
        <TextInput value={user.password} placeholder="Create Password" onChangeText={(text)=>setUser({...user, password: text})}/>
        <Label>Confirm Password</Label>
        <TextInput value={user.confirmed} placeholder="Confirm Password" onChangeText={(text)=>setUser({...user, confirmed: text})}/>
        <Pressable onPress={handleRegister}>
          <Text>Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Register;
