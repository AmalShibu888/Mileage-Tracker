import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack' 
import RefuelingInfo from '../screens/RefuelingInfo';
import RefuelingForm from '../screens/RefuelingForm';
import EdtingRefuelingData from '../screens/EdtingRefuelingData';
import EditingRefuelingForm from '../screens/EditingRefuelingForm';
import { refuelingStackParamList } from '../types/Types';
const Stack = createNativeStackNavigator<refuelingStackParamList>();

const RefuelingNav = () => {
  return (
    <Stack.Navigator>
          <Stack.Screen name="refuelingInfo" component={RefuelingInfo} options={{headerShown : false}}/>
          <Stack.Screen name='refuelingForm' component={RefuelingForm}  options={{headerShown : false }} />
           <Stack.Screen name='editingRefuelingData' component={EdtingRefuelingData} options={{headerShown : false}} />
           <Stack.Screen name='editingRefuelingForm' component={EditingRefuelingForm} options={{headerShown : false}} />


    </Stack.Navigator>
  )
}

export default RefuelingNav