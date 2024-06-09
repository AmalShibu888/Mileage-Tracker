
import React from 'react';
import {RealmProvider} from '@realm/react';
import { Users } from './src/Database/models/UsersSchema';
import StackNavigationOnboarding from './src/components/StackNavigationOnboarding';
import SelectInitialPage from './src/components/SelectInitialPage';
import Login from './src/screens/Login';
import { Vehicles } from './src/Database/models/VehiclesSchema';
import { Refueling } from './src/Database/models/RefuelingSchema';
import { SafeAreaView } from 'react-native';
const App = ()=> {
  return (
    <RealmProvider schema={[Users, Vehicles , Refueling]}>

      <SelectInitialPage />
 
    </RealmProvider>
  );
}

export default App;
