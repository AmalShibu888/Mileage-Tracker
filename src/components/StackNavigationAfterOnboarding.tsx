import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import TabNavigation from './TabNavigation';
import Login from '../screens/Login';
import CreateAccounts from '../screens/CreateAccounts';
import SetPasscode from '../screens/SetPasscode';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useRealm } from '@realm/react';
import { Users } from '../Database/models/UsersSchema';
import CheckPassCode from '../screens/CheckPassCode';
import CheckPasscodesContainer from '../screens/CheckPasscodesContainer';
import Splash2 from '../screens/Splash2';
import { UserInterface } from '../Database/interfaces';
import { StackParamList } from '../types/Types';
import SignUp from '../screens/SignUp';
const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigationAfterOnboarding = () => {

  const realm = useRealm();
  const [activeUser , setActiveUser] = useState<UserInterface | null >(null);

  useEffect(()=>{
    getActiveUser();
  } , [])

  const getActiveUser = ()=>{
    const activeUserCheck = realm.objects<UserInterface>('Users').filtered('active == $0' , true);
    if(activeUserCheck[0])
      setActiveUser(activeUserCheck[0]);
  }
  return (
    <NavigationContainer>
          
          <Stack.Navigator  >
              <Stack.Screen name="splash2" component={Splash2} options={{headerShown : false}}/>
              <Stack.Screen name="signUp" component={SignUp} options={{headerShown : false}} />
              <Stack.Screen name="login" component={Login} options={{headerShown : false}} />
              <Stack.Screen name="checkPasscode"  options={{headerShown : false}} >{()=><CheckPassCode user={activeUser}/>}</Stack.Screen> 
              <Stack.Screen name="checkPasscodeContainer" component={CheckPasscodesContainer} options={{headerShown : false}} />
              <Stack.Screen name="createAccount" component={CreateAccounts} options={{headerShown : false}} />
              <Stack.Screen name="setPasscode" component={SetPasscode} options={{headerShown : false}} />
              <Stack.Screen name="tabNavigation" component={TabNavigation} options={{headerShown : false}} />
              

          </Stack.Navigator>
      </NavigationContainer>
  )
}

export default StackNavigationAfterOnboarding