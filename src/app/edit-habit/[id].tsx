import { CommonStyles } from '@/components/styles/CommonStyles'
import { useHabits } from '@/context/HabitsContext'
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

const ICONS = ['💧', '🏃', '📚', '🧘', '💪', '🎨', '🥗', '🎵']

const COLORS = ['#FFB5C0', '#B5F2C0', '#FFE58A', '#A8D8FF', '#D9B8FF', '#FFC98A']

const EditHabitForm = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { habits, updateHabit, deleteHabit } = useHabits()

  const habit = habits.find((h) => h.id === id)

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0])
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (habit) {
      setTitle(habit.title)
      setNote(habit.subtitle ?? '')
      setSelectedDays(habit.frequency ?? [])
      setSelectedIcon(habit.icon ?? ICONS[0])
      setSelectedColor(habit.color ?? COLORS[0])
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
    Alert.alert('Delete this habit?', 'This will remove it from your list. Your past history stays intact.', [
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
      <SafeAreaView style={CommonStyles.screenSafeView}>
        <View style={styles.formWrapper}>
          <Text>Habit not found</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={CommonStyles.screenSafeView}>
      <ScrollView contentContainerStyle={styles.formWrapper} keyboardShouldPersistTaps="handled">
        <View style={[styles.iconPreview, { backgroundColor: selectedColor }]}>
          <Text style={{ fontSize: 40 }}>{selectedIcon}</Text>
        </View>

        <Text style={styles.label}>Habit Name</Text>
        <TextInput
          placeholder="Morning Meditation"
          value={title}
          onChangeText={setTitle}
          style={styles.inputField}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Note (optional)</Text>
        <TextInput
          placeholder="notes"
          value={note}
          onChangeText={setNote}
          style={styles.inputField}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Repeat Days</Text>
        <View style={styles.wrapper}>
          {DAYS.map((day, idx) => {
            const active = selectedDays.includes(day.value)
            return (
              <Pressable
                key={`${day.value}-${idx}`}
                onPress={() => toggleDay(day.value)}
                style={[styles.dayChip, active && styles.dayChipActive]}
              >
                <Text style={[styles.dayChipText, active && styles.dayChipTextActive]}>
                  {day.label}
                </Text>
              </Pressable>
            )
          })}
        </View>

        <Text style={styles.label}>Icon</Text>
        <View style={styles.wrapper}>
          {ICONS.map((icon) => {
            const active = selectedIcon === icon
            return (
              <Pressable
                key={icon}
                onPress={() => setSelectedIcon(icon)}
                style={[styles.iconChip, active && styles.iconChipActive]}
              >
                <Text style={{ fontSize: 20 }}>{icon}</Text>
              </Pressable>
            )
          })}
        </View>

        <Text style={styles.label}>Color</Text>
        <View style={styles.wrapper}>
          {COLORS.map((color) => {
            const active = selectedColor === color
            return (
              <Pressable key={color} onPress={() => setSelectedColor(color)}>
                <View
                  style={[styles.colors, { backgroundColor: color }, active && styles.colorsActive]}
                />
              </Pressable>
            )
          })}
        </View>

        <Pressable
          style={[styles.submitButton, submitting && { opacity: 0.6 }]}
          onPress={handleSave}
          disabled={submitting}
        >
          <Text style={styles.submitButtonText}>{submitting ? 'Saving...' : 'Save Changes'}</Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Habit</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditHabitForm

const styles = StyleSheet.create({
  formWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },
  iconPreview: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginTop: 16,
    marginBottom: 8,
  },
  inputField: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  dayChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayChipActive: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  dayChipText: {
    color: '#666',
    fontWeight: '600',
  },
  dayChipTextActive: {
    color: '#fff',
  },
  iconChip: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconChipActive: {
    borderColor: '#333',
    borderWidth: 2,
    backgroundColor: '#f2f2f2',
  },
  colors: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorsActive: {
    borderColor: '#333',
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#333',
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    marginTop: 14,
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e33',
  },
  deleteButtonText: {
    color: '#e33',
    fontSize: 16,
    fontWeight: '600',
  },
})