import { CommonStyles } from "@/components/styles/CommonStyles";
import { authService } from "@/services/authService";
import { Label, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleLogin = async()=>{
    setLoading(true)
    try{
      const payload = {
        email: user.email,
        password: user.password
      }
       await authService.login(payload)

      Alert.alert('Login Successful !!')

      await router.push('/Home')
    }catch (err){
      Alert.alert('Login Failed !!', String(err))
      console.log(err, 'Login not working')
    }
  }

  return (
    <SafeAreaView style={CommonStyles.screenSafeView}>
      <View style={CommonStyles.screenViewContainer}>
        <Text>Register Here!</Text>
        <Label>Email</Label>
        <TextInput value={user.email} placeholder="Email Address" onChangeText={(text)=>setUser({...user, email: text})}/>
        <Label>Create Password</Label>
        <TextInput value={user.password} placeholder="Create Password" onChangeText={(text)=>setUser({...user, password: text})}/>
        <Pressable onPress={handleLogin}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
