import { StyleSheet } from "react-native";

export const TabBarStyles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: '#000000', 
        borderRadius: 40, 
        padding: 10, 
        alignItems: 'center',
        justifyContent: 'space-evenly',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
      },
      tabItem: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4, 
      },
      activeTabItem: {
        backgroundColor: '#ffffff', 
        borderRadius: 50, 
      },
      inactiveTabItem: {
        backgroundColor: '#000000', 
        borderRadius: 50, 
      },
      tabLabel: {
        fontSize: 11,
        fontWeight: '700',
      },
      fallbackIcon: {
        width: 18,
        height: 18,
        borderWidth: 1,
      }
})