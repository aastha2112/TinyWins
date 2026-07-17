import { theme } from '@/constants/theme'
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native'

interface PrimaryButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
  color?: string
}

const PrimaryButton = ({ title, onPress, disabled, loading, style, color }: PrimaryButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        { backgroundColor: color ?? theme.colors.black },
        (disabled || loading) && { opacity: 0.5 },
        style,
      ]}
    >
      <Text style={styles.text}>{loading ? 'Please wait...' : title}</Text>
    </Pressable>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  button: {
    paddingVertical: 18,
    borderRadius: theme.radii.full,
    alignItems: 'center',
    ...theme.shadowStrong,
  },
  text: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
})