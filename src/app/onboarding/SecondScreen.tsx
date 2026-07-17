import React from "react";
import { Text, View, StyleSheet, Dimensions, PixelRatio } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "@/components/ui/PrimaryButton";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 375;
const normalize = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

// Stacked from bottom-left to top-right to create a true upward progression
const STACK_STEPS = [
  { name: "leaf", color: "#4ADE80", label: "Health", size: 40, offset: -60 },
  { name: "book", color: "#60A5FA", label: "Mind", size: 46, offset: -20 },
  { name: "bar-chart", color: "#FBBF24", label: "Focus", size: 52, offset: 20 },
  { name: "trending-up", color: "#FB7185", label: "Growth", size: 60, offset: 60 },
];

export default function OnboardingTwo() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#FFF9F5", "#FDFDFD", "#F0F5FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.screenContent}>
          
          {/* Top Section: Unique Ascending Habit Step Layout */}
          <View style={styles.visualSection}>
            <View style={styles.stackContainer}>
              {/* Reverse the array mapping so the largest/latest items sit on top elements */}
              {[...STACK_STEPS].reverse().map((step, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.stackRow, 
                    { 
                      transform: [{ translateX: normalize(step.offset) }],
                      zIndex: STACK_STEPS.length - index
                    }
                  ]}
                >
                  {/* Visual Step Node */}
                  <View 
                    style={[
                      styles.stepNode, 
                      { 
                        width: normalize(step.size), 
                        height: normalize(step.size), 
                        borderRadius: normalize(step.size / 2) 
                      }
                    ]}
                  >
                    <Ionicons name={step.name as any} size={normalize(step.size * 0.5)} color={step.color} />
                  </View>
                  
                  {/* Text indicator tag */}
                  <View style={styles.stepTag}>
                    <Text style={styles.stepTagText}>{step.label}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Bottom Section: Typography Layout & Interactive Call to Action */}
          <View style={styles.textActionSection}>
            <View style={styles.typographyBlock}>
              <Text style={styles.titleText}>
                Stack your habits.{"\n"}Build your system.
              </Text>
              
              <Text style={styles.subtitleText}>
                TinyWins helps you layer micro-routines effortlessly together. When your habits stack, momentum becomes permanent.
              </Text>
              
              <Text style={styles.taglineText}>
                Block by block.
              </Text>
            </View>

            {/* Fixed Button Layout Layer: Container overrides the shrink alignment */}
            <View style={styles.bottomInteractiveBlock}>
              <View style={styles.buttonStretcher}>
                <PrimaryButton
                  title="Continue" 
                  onPress={() => router.push("/onboarding/FinalScreen")} 
                />
              </View>

              {/* Pagination Dots Indicator */}
              <View style={styles.paginationContainer}>
                <View style={[styles.dot, styles.inactiveDot]} />
                <View style={[styles.dot, styles.activeDot]} />
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
  visualSection: {
    height: SCREEN_HEIGHT * 0.46,
    justifyContent: "center",
    alignItems: "center",
  },
  stackContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: normalize(-8), // Elegant overlapping layout step margin
    paddingTop: normalize(20),
  },
  stackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize(12),
    marginVertical: normalize(2),
  },
  stepNode: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 2,
    borderColor: "#FDFDFD",
  },
  stepTag: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    paddingVertical: normalize(4),
    paddingHorizontal: normalize(12),
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
  },
  stepTagText: {
    fontSize: normalize(12),
    fontWeight: "600",
    color: "#5C6166",
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
    marginBottom: normalize(20),
  },
  bottomInteractiveBlock: {
    width: "100%",
    alignItems: "center",
    gap: normalize(20),
  },
  buttonStretcher: {
    width: "100%",
    alignItems: "stretch", // Explicitly forces the internal button architecture to use 100% canvas width
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