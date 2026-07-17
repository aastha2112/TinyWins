import PrimaryButton from '@/components/ui/PrimaryButton'
import SoftCard from '@/components/ui/SoftCard'
import { theme } from '@/constants/theme'
import { HABIT_COLORS } from '@/constants/habitColors'
import { useHabits } from '@/context/HabitsContext'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
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

const EditHabitForm = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { habits, updateHabit, deleteHabit } = useHabits()

  const habit = habits.find((h) => h.id === id)

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0])
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (habit) {
      setTitle(habit.title)
      setNote(habit.subtitle ?? '')
      setSelectedDays(habit.frequency ?? [])
      setSelectedIcon(habit.icon ?? ICONS[0])
      setSelectedColor(habit.color ?? HABIT_COLORS[0])
    }
  }, [habit])

  const toggleDay = (value: number) => {
    setSelectedDays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    )
  }

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Give your habit a name first!')
      return
    }
    if (!id) return
    setSubmitting(true)
    try {
      await updateHabit(id, {
        title: title.trim(),
        subtitle: note.trim() || undefined,
        icon: selectedIcon,
        color: selectedColor,
        frequency: selectedDays.length ? selectedDays : [0, 1, 2, 3, 4, 5, 6],
      })
      router.back()
    } catch (err) {
      Alert.alert("Couldn't update habit", String(err))
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = () => {
    Alert.alert('Delete this habit?', 'Your past history stays intact.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          if (!id) return
          try {
            await deleteHabit(id)
            router.back()
          } catch (err) {
            Alert.alert("Couldn't delete habit", String(err))
          }
        },
      },
    ])
  }

  if (!habit) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text>Habit not found</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Edit Habit</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable onPress={handleDelete} hitSlop={10} style={styles.deleteBtn}>
            <Ionicons name="trash-outline" size={18} color={theme.colors.danger} />
          </Pressable>
          <Pressable onPress={() => router.back()} hitSlop={10} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color={theme.colors.textSecondary} />
          </Pressable>
        </View>
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
        title={submitting ? 'Saving...' : 'Save Changes'}
        onPress={handleSave}
        loading={submitting}
        style={styles.submitButton}
      />
    </SafeAreaView>
  )
}

export default EditHabitForm

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
  deleteBtn: {
    backgroundColor: theme.colors.dangerBg,
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