import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useHabits } from "@/context/HabitsContext";
import { authService } from "@/services/authService";

type TabType = "Today" | "Weekly" | "Overall";

const Analytics = () => {
  const { habits } = useHabits();
  const [activeTab, setActiveTab] = useState<TabType>("Today");
  const [points, setPoints] = useState<number | null>(null);

  const [mockBackendData, setMockBackendData] = useState<any>(null);

  useEffect(() => {
    authService
      .getMe()
      .then((res) => setPoints(res.points))
      .catch(() => {});

    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDayLabel = dayLabels[new Date().getDay()];

    const activeToday = habits.filter((h: any) =>
      h.frequency?.includes(new Date().getDay()),
    );
    const completedToday = habits.filter((h: any) => h.currentStreak > 0); // fallback mock rule

    setMockBackendData({
      today: {
        completedCount: completedToday.length,
        totalCount: activeToday.length || 1,
        empatheticMessage:
          "Small steps are better than quitting. You're showing up, and that matters! 🌱✨",
      },
    });
  }, [habits]);

  const bestCurrentStreak = habits.length
    ? Math.max(...habits.map((h: any) => h.currentStreak ?? 0))
    : 0;
  const overallLongestStreak = habits.length
    ? Math.max(...habits.map((h: any) => h.longestStreak ?? 0))
    : 0;
  const totalWins = habits.reduce(
    (sum: number, h: any) => sum + (h.totalWins ?? 0),
    0,
  );

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <SafeAreaView style={styles.screen}>
      {/* Empathetic Segmented Controller Navigation */}
      <View style={styles.tabContainer}>
        {(["Today", "Weekly", "Overall"] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* --- TODAY VIEW --- */}
        {activeTab === "Today" && (
          <View style={styles.fullWidth}>
            {/* Empathetic Callout Ring Summary */}
            <View style={styles.donutCard}>
              <View style={styles.circleProgressDummy}>
                <Text style={styles.donutValue}>
                  {mockBackendData?.today.completedCount}/
                  {mockBackendData?.today.totalCount}
                </Text>
                <Text style={styles.donutSubText}>Wins Today</Text>
              </View>
              <Text style={styles.empatheticMessage}>
                {mockBackendData?.today.empatheticMessage}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Today's Target Milestones</Text>
            {habits.length === 0 ? (
              <Text style={styles.emptyText}>
                No routines active for today!
              </Text>
            ) : (
              habits.map((habit: any) => (
                <View key={habit.id} style={styles.habitCard}>
                  <View
                    style={[
                      styles.habitIconWrap,
                      { backgroundColor: habit.color ?? "#FFE6E6" },
                    ]}
                  >
                    <Text style={{ fontSize: 18 }}>{habit.icon || "🎯"}</Text>
                  </View>
                  <Text style={styles.habitTitle}>{habit.title}</Text>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={habit.currentStreak > 0 ? "#4CD964" : "#E5E5EA"}
                  />
                </View>
              ))
            )}
          </View>
        )}

        {/* --- WEEKLY VIEW --- */}
        {activeTab === "Weekly" && (
          <View style={styles.fullWidth}>
            <Text style={styles.sectionTitle}>Weekly Commitment Check</Text>
            {habits.map((habit: any) => (
              <View key={habit.id} style={styles.weeklyHabitRow}>
                <View style={styles.weeklyHabitHeader}>
                  <Text style={styles.weeklyHabitIcon}>
                    {habit.icon || "⭐️"}
                  </Text>
                  <Text style={styles.weeklyHabitTitle} numberOfLines={1}>
                    {habit.title}
                  </Text>
                </View>

                {/* Horizontal Week Tracking Bubbles */}
                <View style={styles.weekBubbleRow}>
                  {daysOfWeek.map((day, idx) => {
                    const isToday = day === "Mon"; // simplified baseline tracker mock
                    return (
                      <View key={day} style={styles.dayBubbleContainer}>
                        <Text style={styles.dayLabelText}>{day}</Text>
                        <View
                          style={[
                            styles.statusBubble,
                            isToday
                              ? { backgroundColor: habit.color || "#FF7A45" }
                              : styles.emptyBubble,
                          ]}
                        >
                          {isToday && (
                            <Ionicons name="checkmark" size={12} color="#fff" />
                          )}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* --- OVERALL VIEW --- */}
        {activeTab === "Overall" && (
          <View style={styles.fullWidth}>
            <View style={styles.fireWrapper}>
              <Ionicons
                name="flame"
                size={80}
                color={bestCurrentStreak > 0 ? "#FF7A45" : "#D9D9D9"}
              />
              <Text style={styles.streakNumber}>{bestCurrentStreak}</Text>
              <Text style={styles.streakLabel}>Current Streak Streak</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{points ?? "—"}</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{overallLongestStreak}</Text>
                <Text style={styles.statLabel}>Longest Streak</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{totalWins}</Text>
                <Text style={styles.statLabel}>Total Wins</Text>
              </View>
            </View>

            {/* Comeback encouragement award module */}
            <View style={styles.awardCard}>
              <Ionicons name="shield-checkmark" size={32} color="#FFD700" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.awardTitle}>
                  The "Still Showing Up" Shield
                </Text>
                <Text style={styles.awardSub}>
                  Earned for resuming tracks without giving up.
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFF" },
  container: { alignItems: "center", paddingHorizontal: 20, paddingBottom: 40 },
  fullWidth: { width: "100%" },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: { fontSize: 14, fontWeight: "600", color: "#8E8E93" },
  activeTabText: { color: "#1C1C1E" },
  donutCard: {
    backgroundColor: "#FDF6F0",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  circleProgressDummy: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 6,
    borderColor: "#FFD3B6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  donutValue: { fontSize: 24, fontWeight: "800", color: "#222" },
  donutSubText: { fontSize: 11, color: "#8A8A8F", fontWeight: "500" },
  empatheticMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C1C1E",
    marginVertical: 12,
  },
  emptyText: { color: "#999", textAlign: "center", marginTop: 10 },
  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFC",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  habitIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  habitTitle: { flex: 1, fontSize: 15, fontWeight: "600", color: "#1C1C1E" },
  weeklyHabitRow: {
    backgroundColor: "#FAFAFC",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  weeklyHabitHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  weeklyHabitIcon: { fontSize: 16, marginRight: 8 },
  weeklyHabitTitle: { fontSize: 14, fontWeight: "600", color: "#1C1C1E" },
  weekBubbleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayBubbleContainer: { alignItems: "center" },
  dayLabelText: {
    fontSize: 11,
    color: "#8E8E93",
    marginBottom: 4,
    fontWeight: "500",
  },
  statusBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyBubble: { backgroundColor: "#E5E5EA" },
  fireWrapper: { alignItems: "center", marginVertical: 15 },
  streakNumber: { fontSize: 48, fontWeight: "800", color: "#1C1C1E" },
  streakLabel: { fontSize: 13, color: "#8E8E93", fontWeight: "600" },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFC",
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 10,
  },
  statBox: { flex: 1, alignItems: "center" },
  statDivider: { width: 1, height: 24, backgroundColor: "#E5E5EA" },
  statValue: { fontSize: 18, fontWeight: "700", color: "#1C1C1E" },
  statLabel: { fontSize: 12, color: "#8E8E93", marginTop: 2 },
  awardCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    borderRadius: 16,
    padding: 16,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#FFEAA7",
  },
  awardTitle: { fontSize: 14, fontWeight: "700", color: "#D4AF37" },
  awardSub: { fontSize: 12, color: "#7F6D2B", marginTop: 2 },
});
