import { CommonStyles } from "@/components/styles/CommonStyles";
import { Label, Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmed: "",
  });
  const router = useRouter();
  const {register} = useAuth()
 
  const handleRegister = async()=>{
    setLoading(true)
    try{

      if(user.password !== user.confirmed){
        Alert.alert("Password doesn't match")
        return
      }
      await register(user.email, user.password, user.name)
      Alert.alert('Signup Successful !!')

      await router.push('/(tabs)/home')
    }catch (err){
      console.log(err, 'Register not working')
      Alert.alert('Signup Failed !!' , String(err))
    }finally{
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={CommonStyles.screenSafeView}>
      <View style={CommonStyles.screenViewContainer}>
        <Text style={CommonStyles.headingText}>Register Here!</Text>
        <Label>Name</Label>
        <TextInput style={CommonStyles.inputField} value={user.name} placeholder="Full Name" onChangeText={(text)=>setUser({...user, name: text})} />
        <Label>Email</Label>
        <TextInput style={CommonStyles.inputField} value={user.email} placeholder="Email address" onChangeText={(text)=>setUser({...user, email: text})}/>
        <Label>Create Password</Label>
        <TextInput style={CommonStyles.inputField} value={user.password} placeholder="Create Password" onChangeText={(text)=>setUser({...user, password: text})}/>
        <Label>Confirm Password</Label>
        <TextInput style={CommonStyles.inputField} value={user.confirmed} placeholder="Confirm Password" onChangeText={(text)=>setUser({...user, confirmed: text})}/>
        <Pressable onPress={handleRegister} style={CommonStyles.button}>
          {loading ? <Text style={CommonStyles.buttonText}>...</Text>: <Text style={CommonStyles.buttonText}>Register</Text>}
        </Pressable>
        <Text style={CommonStyles.normalText}>Already have an account? <Link href={'/(auth)/Login'}>
        <Text style={[CommonStyles.normalText, {color: 'blue'}]}> Login Here</Text>
        </Link></Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;
