import { theme } from '@/constants/theme'
import { View, ViewStyle } from 'react-native'

interface SoftCardProps {
  children: React.ReactNode
  style?: ViewStyle
}

const SoftCard = ({ children, style }: SoftCardProps) => {
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.white,
          borderRadius: theme.radii.xl,
          padding: theme.spacing.lg,
          ...theme.shadow,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

export default SoftCard