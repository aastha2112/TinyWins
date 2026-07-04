import { CommonStyles } from "@/components/styles/CommonStyles";
import { authService } from "@/services/authService";
import { Label, Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const {login} = useAuth()

  const handleLogin = async()=>{
    setLoading(true)
    try{
      const payload = {
        email: user.email,
        password: user.password
      }
      const data =  await authService.login(payload)
      await login(data.access_token, data.user)

      Alert.alert('Login Successful !!')
      router.push('/(tabs)/home')

    }catch (err){
      Alert.alert('Login Failed !!', String(err))
      console.log(err, 'Login not working')
    }finally{
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={CommonStyles.screenSafeView}>
      <View style={CommonStyles.screenViewContainer}>
        <Text style={CommonStyles.headingText}>Login Here!</Text>
        <Label>Email</Label>
        <TextInput style={CommonStyles.inputField} value={user.email} placeholder="Email" onChangeText={(text)=>setUser({...user, email: text})}/>
        <Label>Password</Label>
        <TextInput style={CommonStyles.inputField} value={user.password} placeholder="Password" onChangeText={(text)=>setUser({...user, password: text})}/>
        <Pressable onPress={handleLogin} style={CommonStyles.button}>
          { loading ? <Text style={CommonStyles.buttonText}>...</Text>  :<Text style={CommonStyles.buttonText}>Login</Text>}
        </Pressable>
        <Text style={CommonStyles.normalText}>Not registered yet? <Link href={'/(auth)/Register'}>
        <Text style={[CommonStyles.normalText, { color: 'blue'}]}> Register Here</Text>
        </Link></Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
