import PrimaryButton from '@/components/ui/PrimaryButton'
import SoftCard from '@/components/ui/SoftCard'
import { theme } from '@/constants/theme'
import { HABIT_COLORS } from '@/constants/habitColors'
import { useHabits } from '@/context/HabitsContext'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DAYS = [
  { label: 'M', value: 1 },
  { label: 'T', value: 2 },
  { label: 'W', value: 3 },
  { label: 'T', value: 4 },
  { label: 'F', value: 5 },
  { label: 'S', value: 6 },
  { label: 'S', value: 0 },
]

const ICONS = ['💧', '🏃', '📚', '🧘', '💪', '🎨', '🥗', '🎵', '😴', '✍️']

const CreateHabitForm = () => {
  const router = useRouter()
  const { createHabit } = useHabits()

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0])
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0])
  const [submitting, setSubmitting] = useState(false)

  const toggleDay = (value: number) => {
    setSelectedDays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    )
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Give your habit a name first!')
      return
    }
    setSubmitting(true)
    try {
      await createHabit({
        title: title.trim(),
        subtitle: note.trim() || undefined,
        icon: selectedIcon,
        color: selectedColor,
        frequency: selectedDays.length ? selectedDays : [0, 1, 2, 3, 4, 5, 6],
      })
      router.back()
    } catch (err) {
      Alert.alert("Couldn't create habit", String(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>New Habit</Text>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.closeBtn}>
          <Ionicons name="close" size={20} color={theme.colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[theme.colors.gradientPink, theme.colors.gradientLavender]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={[styles.iconPreview, { backgroundColor: selectedColor }]}>
            <Text style={{ fontSize: 28 }}>{selectedIcon}</Text>
          </View>
          <TextInput
            placeholder="Habit name"
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
            placeholderTextColor="rgba(26,26,26,0.35)"
          />
          <TextInput
            placeholder="Note (optional)"
            value={note}
            onChangeText={setNote}
            style={styles.noteInput}
            placeholderTextColor="rgba(26,26,26,0.3)"
          />
        </LinearGradient>

        <SoftCard style={styles.section}>
          <Text style={styles.label}>Repeat</Text>
          <View style={styles.dayWrapper}>
            {DAYS.map((day, idx) => {
              const active = selectedDays.includes(day.value)
              return (
                <Pressable
                  key={`${day.value}-${idx}`}
                  onPress={() => toggleDay(day.value)}
                  style={[styles.dayChip, active && { backgroundColor: selectedColor, borderColor: selectedColor }]}
                >
                  <Text style={[styles.dayChipText, active && styles.dayChipTextActive]}>
                    {day.label}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </SoftCard>

        <SoftCard style={styles.section}>
          <Text style={styles.label}>Icon</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ICONS.map((icon) => {
              const active = selectedIcon === icon
              return (
                <Pressable
                  key={icon}
                  onPress={() => setSelectedIcon(icon)}
                  style={[styles.iconChip, active && { borderColor: selectedColor, backgroundColor: theme.colors.backgroundAlt }]}
                >
                  <Text style={{ fontSize: 18 }}>{icon}</Text>
                </Pressable>
              )
            })}
          </ScrollView>
        </SoftCard>

        <SoftCard style={styles.section}>
          <Text style={styles.label}>Color</Text>
          <View style={styles.colorWrapper}>
            {HABIT_COLORS.map((color) => {
              const active = selectedColor === color
              return (
                <Pressable key={color} onPress={() => setSelectedColor(color)}>
                  <View style={[styles.colorSwatch, { backgroundColor: color }, active && styles.colorSwatchActive]} />
                </Pressable>
              )
            })}
          </View>
        </SoftCard>
      </ScrollView>

      <PrimaryButton
        title={submitting ? 'Creating...' : 'Create Habit'}
        onPress={handleSubmit}
        loading={submitting}
        style={styles.submitButton}
      />
    </SafeAreaView>
  )
}

export default CreateHabitForm

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    letterSpacing: 0.2,
  },
  closeBtn: {
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: theme.radii.full,
    padding: 8,
  },
  scrollContent: {
    paddingBottom: theme.spacing.lg,
  },
  heroCard: {
    borderRadius: theme.radii.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  iconPreview: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  titleInput: {
    fontSize: 19,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    paddingVertical: 2,
  },
  noteInput: {
    fontSize: 13,
    color: 'rgba(26,26,26,0.55)',
    marginTop: 6,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  dayWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
  dayChip: {
    width: 36,
    height: 36,
    borderRadius: theme.radii.full,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  dayChipTextActive: {
    color: theme.colors.white,
  },
  iconChip: {
    width: 42,
    height: 42,
    borderRadius: theme.radii.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  colorWrapper: {
    flexDirection: 'row',
    gap: 16,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: theme.radii.full,
    borderWidth: 2.5,
    borderColor: 'transparent',
  },
  colorSwatchActive: {
    borderColor: theme.colors.black,
  },
  submitButton: {
    marginBottom: theme.spacing.sm,
  },
})