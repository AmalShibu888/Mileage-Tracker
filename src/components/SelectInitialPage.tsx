import React from 'react'
import { View } from 'react-native'
import StackNavigationOnboarding from './StackNavigationOnboarding'
import { useQuery , useRealm } from '@realm/react';
import { Users } from '../Database/models/UsersSchema';
import StackNavigationAfterOnboarding from './StackNavigationAfterOnboarding';
const SelectInitialPage = () => {
  const realm = useRealm();
  const users = realm.objects(Users);
  if(users.length == 0)
    return <StackNavigationOnboarding />
  
  return <StackNavigationAfterOnboarding />
}

export default SelectInitialPage