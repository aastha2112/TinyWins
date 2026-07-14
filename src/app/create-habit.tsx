import { CommonStyles } from '@/components/styles/CommonStyles'
import { useHabits } from '@/context/HabitsContext'
import { Ionicons } from '@expo/vector-icons'
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

const ICONS = ['💧', '🏃', '📚', '🧘', '💪', '🎨', '🥗', '🎵']

const COLORS = ['#FFB5C0', '#B5F2C0', '#FFE58A', '#A8D8FF', '#D9B8FF', '#FFC98A']

const CreateHabitForm = () => {
  const router = useRouter()
  const { createHabit } = useHabits()

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0])
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
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
    <SafeAreaView style={CommonStyles.screenSafeView}>
      <ScrollView contentContainerStyle={styles.formWrapper} keyboardShouldPersistTaps="handled">
        <View style={[styles.iconPreview, { backgroundColor: selectedColor }]}>
          <Text style={{ fontSize: 40 }}>{selectedIcon}</Text>
        </View>

        <Text style={styles.label}>New Habit</Text>
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
        <Text style={styles.hint}>Leave all unselected to repeat every day</Text>

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
                  style={[
                    styles.colors,
                    { backgroundColor: color },
                    active && styles.colorsActive,
                  ]}
                />
              </Pressable>
            )
          })}
        </View>

        <Pressable
          style={[styles.submitButton, submitting && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.submitButtonText}>
            {submitting ? 'Creating...' : 'Create Habit'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateHabitForm

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
  hint: {
    alignSelf: 'flex-start',
    fontSize: 12,
    color: '#999',
    marginTop: 4,
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
})