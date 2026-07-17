import React from "react";
import { Text, View, StyleSheet, Dimensions, PixelRatio } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import OnboardingButton from "@/components/onboarding/OnboardingButton";
import { onboardingStyles } from "@/components/styles/OnboardingScreenStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 375;
const normalize = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

const RING_RADIUS = normalize(105);
const ORBIT_ICONS = [
  { name: "sparkles", color: "#FFD700" },
  { name: "flame", color: "#FF4500" },
  { name: "heart", color: "#FF1493" },
  { name: "star", color: "#FF8C00" },
  { name: "sunny", color: "#FFA500" },
  { name: "leaf", color: "#32CD32" },
  { name: "water", color: "#1E90FF" },
  { name: "moon", color: "#9370DB" },
];

export default function App() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#F4F7FB", "#FDFDFD", "#EBF3FE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.screenContent}>
          
          {/* Top Section: Orbital Graphic Ring Layout */}
          <View style={styles.logoSection}>
            <View style={styles.outerOrbitRing}>
              <View style={styles.innerOrbitRing}>
                
                {/* Core Center Focal Icon */}
                <View style={styles.centerIconContainer}>
                  <Ionicons name="trophy" size={normalize(44)} color="#FFD700" />
                </View>

                {/* Orbiting Ring Items */}
                {ORBIT_ICONS.map((icon, index) => {
                  const angle = (index * 2 * Math.PI) / ORBIT_ICONS.length;
                  const x = RING_RADIUS * Math.cos(angle);
                  const y = RING_RADIUS * Math.sin(angle);

                  return (
                    <View
                      key={index}
                      style={[
                        styles.orbitNode,
                        {
                          transform: [
                            { translateX: x },
                            { translateY: y },
                          ],
                        },
                      ]}
                    >
                      <Ionicons name={icon.name as any} size={normalize(22)} color={icon.color} />
                    </View>
                  );
                })}

              </View>
            </View>
          </View>

          {/* Bottom Section: Typography Layout & Interactive Call to Action */}
          <View style={styles.textActionSection}>
            <View style={styles.typographyBlock}>
              <Text style={styles.titleText}>
                Big changes start{"\n"}unbelievably small.
              </Text>
              
              <Text style={styles.subtitleText}>
                Welcome to TinyWins, where every minor effort stacks up. Focus on showing up today, not on being perfect.
              </Text>
              
              <Text style={styles.taglineText}>
                Breathe easier.
              </Text>
            </View>

            {/* Bottom Interaction Area */}
            <View style={styles.bottomInteractiveBlock}>
              <OnboardingButton
                onPress={() => router.push("/onboarding/SecondScreen")}
                style={[
                  onboardingStyles.button,
                  { width: "100%", alignSelf: "stretch" }
                ]}
              >
                Start Small
              </OnboardingButton>

              {/* Pagination Dots Indicator */}
              <View style={styles.paginationContainer}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={[styles.dot, styles.inactiveDot]} />
                <View style={[styles.dot, styles.inactiveDot]} />
              </View>
            </View>

          </View>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
    width: "100%",
  },
  logoSection: {
    height: SCREEN_HEIGHT * 0.46,
    justifyContent: "center",
    alignItems: "center",
  },
  outerOrbitRing: {
    width: normalize(260),
    height: normalize(260),
    borderRadius: normalize(130),
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.03)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  innerOrbitRing: {
    width: normalize(180),
    height: normalize(180),
    borderRadius: normalize(90),
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.02)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  centerIconContainer: {
    width: normalize(86),
    height: normalize(86),
    borderRadius: normalize(43),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },
  orbitNode: {
    position: "absolute",
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(24),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  textActionSection: {
    flex: 1,
    width: "100%",
    paddingHorizontal: normalize(32),
    paddingBottom: normalize(24),
    justifyContent: "space-between", 
    alignItems: "center",
  },
  typographyBlock: {
    width: "100%",
    alignItems: "center",
    paddingTop: normalize(12),
  },
  titleText: {
    fontSize: normalize(30),
    fontWeight: "800",
    color: "#1A1C1E",
    textAlign: "center",
    lineHeight: normalize(38),
    letterSpacing: -0.8,
    marginBottom: normalize(14),
  },
  subtitleText: {
    fontSize: normalize(15),
    fontWeight: "400",
    color: "#5C6166",
    textAlign: "center",
    lineHeight: normalize(23),
    marginBottom: normalize(20),
    paddingHorizontal: normalize(8),
  },
  taglineText: {
    fontSize: normalize(16),
    fontWeight: "600",
    color: "#3B82F6",
    textAlign: "center",
  },
  bottomInteractiveBlock: {
    width: "100%",
    alignItems: "center",
    gap: normalize(20), 
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: normalize(8),
  },
  dot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
  },
  activeDot: {
    backgroundColor: "#111111", 
    width: normalize(10),       
    height: normalize(10),
    borderRadius: normalize(5),
  },
  inactiveDot: {
    backgroundColor: "#D1D5DB", 
  },
});