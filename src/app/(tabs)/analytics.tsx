import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useHabits } from "@/context/HabitsContext";
import { authService } from "@/services/authService";
import { analyticsService } from "@/services/analyticsService";

type TabType = "Today" | "Weekly" | "Overall";

const Analytics = () => {
  const { habits } = useHabits();
  console.log("user habits", habits);
  const [activeTab, setActiveTab] = useState<TabType>("Today");
  const [points, setPoints] = useState<number | null>(null);

  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      authService
        .getMe()
        .then((res) => setPoints(res.points))
        .catch(() => {}),
      analyticsService
        .getAnalytics()
        .then((data) => setAnalyticsData(data))
        .catch(() => {}),
    ]).finally(() => {
      setLoading(false);
    });
  }, [habits]);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  if (loading) {
    return (
      <SafeAreaView style={[styles.screen, styles.centered]}>
        <ActivityIndicator size="large" color="#FF7A45" />
      </SafeAreaView>
    );
  }

  const todayStats = analyticsData?.today || {
    completedCount: 0,
    totalCount: 0,
    empatheticMessage: "Every step counts! 🌱",
    habits: [],
  };
  const weeklyStats = analyticsData?.weekly || [];
  const overallStats = analyticsData?.overall || {
    bestCurrentStreak: 0,
    overallLongestStreak: 0,
    totalWins: 0,
  };

  return (
    <SafeAreaView style={styles.screen}>
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
            <View style={styles.donutCard}>
              <View style={styles.circleProgressDummy}>
                <Text style={styles.donutValue}>
                  {todayStats.completedCount}/{todayStats.totalCount}
                </Text>
                <Text style={styles.donutSubText}>Wins Today</Text>
              </View>
              <Text style={styles.empatheticMessage}>
                {todayStats.empatheticMessage}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Today's Target Milestones</Text>
            {todayStats.habits.length === 0 ? (
              <Text style={styles.emptyText}>
                No routines scheduled for today! Rest up or take small steps. 🌟
              </Text>
            ) : (
              todayStats.habits.map((habit: any) => (
                <View key={habit.id} style={styles.habitCard}>
                  <View
                    style={[
                      styles.habitIconWrap,
                      { backgroundColor: habit.color ?? "#FAFAFC" },
                    ]}
                  >
                    <Text style={{ fontSize: 18 }}>{habit.icon || "🎯"}</Text>
                  </View>
                  <Text style={styles.habitTitle}>{habit.title}</Text>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={habit.completed ? "#4CD964" : "#E5E5EA"}
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
            {weeklyStats.length === 0 ? (
              <Text style={styles.emptyText}>
                Create tracking logs to populate consistency metrics.
              </Text>
            ) : (
              weeklyStats.map((habit: any) => (
                <View key={habit.id} style={styles.weeklyHabitRow}>
                  <View style={styles.weeklyHabitHeader}>
                    <View
                      style={[
                        styles.miniIconWrap,
                        { backgroundColor: habit.color ?? "#E5E5EA" },
                      ]}
                    >
                      <Text style={{ fontSize: 14 }}>{habit.icon || "⭐️"}</Text>
                    </View>
                    <Text style={styles.weeklyHabitTitle} numberOfLines={1}>
                      {habit.title}
                    </Text>
                  </View>

                  <View style={styles.weekBubbleRow}>
                    {daysOfWeek.map((day) => {
                      const dayHistory = habit.history?.[day] || {
                        isScheduled: false,
                        status: "PENDING",
                      };

                      let bubbleColor = "#E5E5EA";
                      let iconName: any = null;

                      if (dayHistory.status === "COMPLETED") {
                        bubbleColor = habit.color || "#4CD964";
                        iconName = "checkmark";
                      } else if (dayHistory.status === "MISSED") {
                        bubbleColor = "#F2F2F7";
                      }

                      return (
                        <View key={day} style={styles.dayBubbleContainer}>
                          <Text style={styles.dayLabelText}>{day}</Text>
                          <View
                            style={[
                              styles.statusBubble,
                              { backgroundColor: bubbleColor },
                            ]}
                          >
                            {iconName && (
                              <Ionicons
                                name={iconName}
                                size={12}
                                color="#fff"
                              />
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {/* --- OVERALL VIEW --- */}
        {activeTab === "Overall" && (
          <View style={styles.fullWidth}>
            <View style={styles.fireWrapper}>
              <Ionicons
                name="flame"
                size={80}
                color={
                  overallStats.bestCurrentStreak > 0 ? "#FF7A45" : "#D9D9D9"
                }
              />
              <Text style={styles.streakNumber}>
                {overallStats.bestCurrentStreak}
              </Text>
              <Text style={styles.streakLabel}>Current Streak</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{points ?? "—"}</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {overallStats.overallLongestStreak}
                </Text>
                <Text style={styles.statLabel}>Longest Streak</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{overallStats.totalWins}</Text>
                <Text style={styles.statLabel}>Total Wins</Text>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
              Consistency Calendars
            </Text>

            {(analyticsData?.overall?.habitsCalendar || []).length === 0 ? (
              <Text style={styles.emptyText}>
                No tracking history available yet to show on the calendar grid.
              </Text>
            ) : (
              (analyticsData?.overall?.habitsCalendar || []).map(
                (habit: any) => (
                  <View key={habit.id} style={styles.calendarCard}>
                    <View style={styles.calendarHeader}>
                      <View
                        style={[
                          styles.miniIconWrap,
                          { backgroundColor: habit.color ?? "#E5E5EA" },
                        ]}
                      >
                        <Text style={{ fontSize: 13 }}>
                          {habit.icon || "⭐️"}
                        </Text>
                      </View>
                      <Text style={styles.calendarHabitTitle}>
                        {habit.title}
                      </Text>
                    </View>

                    <View style={styles.gridContainer}>
                      {(habit.calendarHistory || []).map((day: any) => (
                        <View
                          key={day.date}
                          style={[
                            styles.calendarDot,
                            {
                              backgroundColor: day.completed
                                ? habit.color || "#4CD964"
                                : "#E5E5EA",
                            },
                          ]}
                        />
                      ))}
                    </View>
                    <Text style={styles.calendarFooterText}>
                      Showing active log history (Past 30 Days)
                    </Text>
                  </View>
                ),
              )
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  screen: { flex: 1},
  centered: { justifyContent: "center", alignItems: "center" },
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
  emptyText: {
    color: "#999",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 18,
  },
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
  miniIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
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
  awardSub: { fontSize: 12, color: "#7F6D2B", marginTop: 4, lineHeight: 16 },
  calendarCard: {
    backgroundColor: "#FAFAFC",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    width: "100%",
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  calendarHabitTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C1C1E",
    marginLeft: 4,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "flex-start",
    paddingVertical: 4,
  },
  calendarDot: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  calendarFooterText: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 8,
    textAlign: "right",
  },
});
