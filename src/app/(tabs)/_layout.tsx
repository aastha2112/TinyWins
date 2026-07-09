import CustomTabBar from "@/components/main/CustomTabBar";
import { CommonStyles } from "@/components/styles/CommonStyles";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HabitProvider from "@/context/HabitsContext";

const MainLayout = () => {
  return (
    <HabitProvider>
    <SafeAreaView style={CommonStyles.screenSafeView}>
    <Tabs screenOptions={{ 
      headerShown: false 
    }} 
    tabBar={(props)=> <CustomTabBar {...props}/>}
    >
      <Tabs.Screen name="home" options={{ tabBarLabel: 'home', tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ) }} />
        <Tabs.Screen name="wins" options={{ tabBarLabel: 'wins' , tabBarIcon: ({ color, size }) => (
              <Entypo name="baidu" size={size} color={color}  />
            )  }}  />
          <Tabs.Screen name="analytics" options={{ tabBarLabel: 'analytics' , tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="google-analytics" size={size} color={color} />
              )}} />
        <Tabs.Screen name="profile" options={{ tabBarLabel: 'profile', tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-circle" size={size} color={color} />
            ) }} />
    </Tabs>
    </SafeAreaView>
    </HabitProvider>
  );
};

export default MainLayout;

