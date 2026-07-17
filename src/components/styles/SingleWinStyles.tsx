import { StyleSheet } from 'react-native'

export const SingleWinStyles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
  },
  iconBubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconText: {
    fontSize: 22,
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#232323',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12.5,
    color: '#6b6b6b',
    marginTop: 2,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    marginTop: 8,
  },
  dayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D8D8D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayDotText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
  },
  rightCol: {
    alignItems: 'center',
    marginLeft: 8,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 6,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF7A45',
  },
  checkboxContainer: {
    padding: 2,
  },
})