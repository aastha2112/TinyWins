import { Tabs } from "expo-router";

const MainLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Home" />
    </Tabs>
  );
};

export default MainLayout;
