import { Tabs } from "expo-router";

const MainLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Wins" />
    </Tabs>
  );
};

export default MainLayout;
