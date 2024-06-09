import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ProfilePage from '../screens/ProfilePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text  ,Image} from 'react-native';
import {  Svg } from 'react-native-svg';
import AddVehiclesForm from '../screens/AddVehiclesForm';
import Vehicles from '../screens/VehiclesInfo';
import VehiclesNav from '../navigators/VehiclesNav';
import RefuelingNav from '../navigators/RefuelingNav';
import PerformancePage from '../screens/PerformancePage';
import DrawerNavigator from '../navigators/DrawerNavigator';
import {   Calendar , Filter , Zap} from "react-native-feather";
import { BottomTabParamList } from '../types/Types';
import Vehicle from '../rcs/vehicle.svg'
import Home from '../rcs/home.svg'
import Refueling from '../rcs/refueling.svg'
import Performance from '../rcs/performance.svg'
import VehicleFocused from '../rcs/vehicleFocused.svg'
import HomeFocused from '../rcs/homeFocused.svg'
import RefuelingFocused from '../rcs/refuelingFocused.svg'
import PerformanceFocused from '../rcs/performanceFocused.svg'
import { SafeAreaView } from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator<BottomTabParamList>();


  const getTabBarIcon = (routeName : string, focused : boolean) => {
    let color='white' , color2 = 'white';
  
    switch (routeName) {
      case 'Home':

        if(focused)
        return <HomeFocused/>
        return <Home />
      case 'Refueling':
        if(focused)
        return <RefuelingFocused/>
        return <Refueling/>
      case 'Performance':
        if(focused)
        return <PerformanceFocused/>
        return <Performance/>

      case 'Vehicles':
        if(focused)
        return <VehicleFocused/>
        return <Vehicle/>
  
      default:
        return <Zap stroke='#0B3C58' strokeWidth={1} fill={color} width={24} height={24}/>
    }
}

const TabNavigation = () => {
  return (
    
         <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
          
          tabBarLabel: ({ focused }) => {
            return <Text style={{fontSize: 11, fontFamily : focused ?'NewRubrik-SemiBold': 'NewRubrik-Medium'  , color: focused ? '#0B3C58' : '#58798C'}}>{route.name}</Text>
          }
        })}>
            <Tab.Screen  name="Home" component={DrawerNavigator}  options={{headerShown : false ,tabBarStyle :{position : 'absolute', }}}/>
            <Tab.Screen name="Refueling" component={RefuelingNav}
            options={({ route }) => ({
              tabBarStyle: ((route) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                if (routeName === 'refuelingForm' || routeName === 'editingRefuelingForm' || routeName === 'editingRefuelingData' ) {
                  return { display: "none",position : 'absolute'}
                }
                return {position : 'absolute'}
              } )(route)
            ,headerShown : false})}/>
            <Tab.Screen name="Performance" component={PerformancePage} options={{headerShown : false ,tabBarStyle :{position : 'absolute'}}}/>
            <Tab.Screen name="Vehicles" component={VehiclesNav } 
              options={({ route }) => ({
                tabBarStyle: ((route) => {
                  const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                  if (routeName === 'addVehiclesForm' || routeName === 'congratz') {
                    return { display: "none",position : 'absolute' }
                  }
                  return {position : 'absolute'}
                } )(route)
              ,headerShown : false })}
            />
            
         </Tab.Navigator>
    
  )
}

export default TabNavigation