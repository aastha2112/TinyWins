import AuthButtonsModal from '@/components/onboarding/AuthButtonsModal'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { theme } from '@/constants/theme'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, PixelRatio } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

const scale = SCREEN_WIDTH / 375
const normalize = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * scale))

const OnboardingThree = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <LinearGradient
      colors={["#F4F7FB", "#FDFDFD", "#EBF3FE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.screenContent}>
          
          <View style={styles.visualSection}>
            <View style={styles.layeredCanvas}>
              
              <LinearGradient
                colors={[theme.colors.gradientPink || '#FCE7F3', theme.colors.gradientLavender || '#E0E7FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.bgGlowCircle}
              />

              <View style={styles.emojiOrb}>
                <Text style={styles.heroEmoji}>🔥</Text>
              </View>

              <View style={[styles.floatingPill, styles.pillTop]}>
                <Text style={styles.pillEmoji}>✨</Text>
                <Text style={styles.pillText}>Consistency built</Text>
              </View>

              <View style={[styles.floatingPill, styles.pillBottom]}>
                <Text style={styles.pillEmoji}>🌱</Text>
                <Text style={styles.pillText}>1% better today</Text>
              </View>

            </View>
          </View>

          <View style={styles.textActionSection}>
            <View style={styles.typographyBlock}>
              <Text style={styles.titleText}>
                Ready for your{"\n"}first tiny win?
              </Text>
              
              <Text style={styles.subtitleText}>
                Let's build something small today. Future you is already proud of you for starting.
              </Text>

              <Text style={styles.taglineText}>
                Breathe easier.
              </Text>
            </View>

            <View style={styles.bottomInteractiveBlock}>
              <View style={styles.buttonStretcher}>
                <PrimaryButton 
                  title="Get Started" 
                  onPress={() => setIsModalVisible(true)} 
                />
              </View>

              <View style={styles.paginationContainer}>
                <View style={[styles.dot, styles.inactiveDot]} />
                <View style={[styles.dot, styles.inactiveDot]} />
                <View style={[styles.dot, styles.activeDot]} />
              </View>
            </View>

          </View>

        </View>
      </SafeAreaView>

      {isModalVisible && (
        <View style={styles.darkOverlay} />
      )}

      <AuthButtonsModal visible={isModalVisible} onPress={() => setIsModalVisible(false)} />
    </LinearGradient>
  )
}

export default OnboardingThree

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
  layeredCanvas: {
    width: normalize(260),
    height: normalize(260),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bgGlowCircle: {
    width: normalize(220),
    height: normalize(220),
    borderRadius: normalize(110),
    opacity: 0.85,
  },
  emojiOrb: {
    position: "absolute",
    width: normalize(96),
    height: normalize(96),
    borderRadius: normalize(48),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    shadowColor: "rgba(0, 0, 0, 0.04)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 4,
  },
  heroEmoji: {
    fontSize: normalize(42),
  },
  floatingPill: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(20),
    zIndex: 3,
    shadowColor: "rgba(0, 0, 0, 0.04)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 5,
  },
  pillTop: {
    top: normalize(25),
    left: normalize(-15),
    transform: [{ rotate: "-6deg" }],
  },
  pillBottom: {
    bottom: normalize(30),
    right: normalize(-20),
    transform: [{ rotate: "4deg" }],
  },
  pillEmoji: {
    fontSize: normalize(16),
    marginRight: normalize(8),
  },
  pillText: {
    fontSize: normalize(13),
    fontWeight: "600",
    color: "#1A1C1E",
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
    alignItems: "stretch",
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
    backgroundColor: "#000000",
    width: normalize(22),
    borderRadius: normalize(4),
  },
  inactiveDot: {
    backgroundColor: theme.colors.border || "#D1D5DB",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', 
    zIndex: 99, 
  },
})