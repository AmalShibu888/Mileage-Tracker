import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import ProfilePage from '../screens/ProfilePage';
import UserPopUp from '../components/UserPopUp';
import { useWindowDimensions } from 'react-native';
import { drawerParamList } from '../types/Types';

const Drawer = createDrawerNavigator<drawerParamList>();
const DrawerNavigator = () => {
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: isLargeScreen ? null : { width: '85%' },overlayColor: 'transparent'
      }}
      drawerContent={(props) => <UserPopUp {...props}/>}
    >
      <Drawer.Screen name="profile" component={ProfilePage} options={{headerShown : false}}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator