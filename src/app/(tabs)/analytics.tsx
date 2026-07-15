import { authService } from '@/services/authService'
import { useHabits } from '@/context/HabitsContext'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Analytics = () => {
  const { habits } = useHabits()
  const [points, setPoints] = useState<number | null>(null)

  useEffect(() => {
    authService.getMe().then((res) => setPoints(res.points)).catch(() => {})
  }, [])

  const bestCurrentStreak = habits.length
    ? Math.max(...habits.map((h: any) => h.currentStreak ?? 0))
    : 0
  const overallLongestStreak = habits.length
    ? Math.max(...habits.map((h: any) => h.longestStreak ?? 0))
    : 0
  const totalWins = habits.reduce((sum: number, h: any) => sum + (h.totalWins ?? 0), 0)

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerLabel}>DAY STREAK</Text>

        <View style={styles.fireWrapper}>
          <Ionicons name="flame" size={100} color={bestCurrentStreak > 0 ? '#FF7A45' : '#D9D9D9'} />
        </View>
        <Text style={styles.streakNumber}>{bestCurrentStreak}</Text>
        <Text style={styles.streakLabel}>day streak</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{points ?? '—'}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{overallLongestStreak}</Text>
            <Text style={styles.statLabel}>Longest streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalWins}</Text>
            <Text style={styles.statLabel}>Total wins</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Habits</Text>

        {habits.length === 0 ? (
          <Text style={styles.emptyText}>No habits yet — create one to start your streak!</Text>
        ) : (
          habits.map((habit: any) => (
            <View key={habit.id} style={styles.habitCard}>
              <View style={[styles.habitIconWrap, { backgroundColor: habit.color ?? '#eee' }]}>
                <Text style={{ fontSize: 20 }}>{habit.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.habitTitle}>{habit.title}</Text>
                <Text style={styles.habitSubtext}>
                  Best streak: {habit.longestStreak ?? 0} days
                </Text>
              </View>
              <View style={styles.habitStreakBadge}>
                <Ionicons
                  name="flame"
                  size={16}
                  color={habit.currentStreak > 0 ? '#FF7A45' : '#ccc'}
                />
                <Text style={styles.habitStreakText}>{habit.currentStreak ?? 0}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Analytics

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  headerLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
    marginTop: 10,
  },
  fireWrapper: {
    marginTop: 10,
  },
  streakNumber: {
    fontSize: 56,
    fontWeight: '800',
    color: '#222',
    marginTop: 4,
  },
  streakLabel: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 16,
    paddingVertical: 18,
    width: '100%',
    marginBottom: 30,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e0e0e0',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  emptyText: {
    color: '#999',
    marginTop: 20,
  },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fafafa',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  habitIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  habitTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  habitSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  habitStreakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  habitStreakText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#444',
  },
})