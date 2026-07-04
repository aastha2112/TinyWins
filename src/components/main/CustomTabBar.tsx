import { Text, TouchableOpacity, View } from 'react-native'
import { TabBarStyles } from '../styles/TabBarStyles';

const CustomTabBar = ({state, descriptors, navigation } : {state: any, descriptors: any, navigation: any}) => {
  console.log('tab bar mounted')
   return (<View style={TabBarStyles.tabBarContainer}>
   {
    state.routes.map((route : any, index: number)=>{
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

        const isFocused = state.index === index

        const onPress = ()=>{
           const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
           })
           if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        }

        

        return (
            <TouchableOpacity onPress={onPress} key={route.key} style={[
                TabBarStyles.tabItem,
                isFocused ? TabBarStyles.activeTabItem : TabBarStyles.inactiveTabItem
              ]}>
            {options.tabBarIcon ? (
              options.tabBarIcon({ color: isFocused ? '#000' : '#fff', size: 20 })
            ) : (
              <View style={[TabBarStyles.fallbackIcon, { borderColor: isFocused ? '#000' : '#fff' }]} />
            )}
              <Text style={[TabBarStyles.tabLabel, { color: isFocused ? '#000000' : '#ffffff' }]}>
              {label.toLowerCase()}
            </Text>
            </TouchableOpacity>
          )
    })
   }
   </View>)
  
}

export default CustomTabBar