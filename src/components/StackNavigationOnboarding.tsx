import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import SignUp from '../screens/SignUp';
import CreateAccounts from '../screens/CreateAccounts';
import SetPasscode from '../screens/SetPasscode';
import ProfilePage from '../screens/ProfilePage';
import TabNavigation from './TabNavigation';
import Login from '../screens/Login';
import CheckPasscodesContainer from '../screens/CheckPasscodesContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StackParamList } from '../types/Types';


const Stack = createNativeStackNavigator<StackParamList>();
const StackNavigationOnboarding = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
   
    
            <Stack.Screen name="splash" component={Splash} options={{headerShown : false}}/>
            <Stack.Screen name="signUp" component={SignUp} options={{headerShown : false}} />
            <Stack.Screen name="createAccount" component={CreateAccounts} options={{headerShown : false}} />
            <Stack.Screen name="setPasscode" component={SetPasscode} options={{headerShown : false}} />
            <Stack.Screen name="tabNavigation" component={TabNavigation} options={{headerShown : false}} />
            <Stack.Screen name='login' component={Login} options={{headerShown : false}} />
            <Stack.Screen name="checkPasscodeContainer" component={CheckPasscodesContainer} options={{headerShown : false}} />


    
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default StackNavigationOnboarding