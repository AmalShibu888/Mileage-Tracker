import { useQuery, useRealm } from '@realm/react';
import React from 'react'
import { View  ,Text, StyleSheet , ScrollView, SafeAreaView} from 'react-native'
import { Vehicles } from '../Database/models/VehiclesSchema';
import useUserStore from '../state/Users';
import { useState ,useEffect } from 'react';
import AddVehicle from '../components/AddVehicle';
import PerformanceWithVehicle from '../components/PerformanceWithVehicle';
import { Refueling } from "../Database/models/RefuelingSchema";
import useVehicleStore from "../state/Vehicles";
import useRefuelTriggerStore from '../state/RefuelTrigger';
import useVehicleArrayStore from '../state/VehiclesArray';
import { FC } from 'react';

interface Props{
  navigation : any
}

const PerformancePage : FC<Props> = ({navigation}) => {
  const realm = useRealm();
  const {curVehId,setRefuelState} = useRefuelTriggerStore();
    const allRefueling = useQuery(Refueling);
    const {VehiclesArray} = useVehicleArrayStore();
    const { refuelDatas} = useRefuelTriggerStore();




    const navigateToVehicleForm = ()=>{
      navigation.navigate('Vehicles' , {screen: 'addVehiclesForm'})
    }
    


  return (
   <SafeAreaView style={{flex : 1}}>
    <View style={styles.container}>
      <View style={styles.cont}>
      <Text style={styles.heading}>Performance</Text>
      </View>
        <ScrollView style={styles.scrollContainer}>
        {
            VehiclesArray.length > 0  ? 
             <PerformanceWithVehicle navigation={navigation} userVehicles={VehiclesArray}/>
            :
            (
                <View style ={styles.addVehicleContainer}>
                  <AddVehicle handlePress={navigateToVehicleForm}/>
                </View>
            )
            
        }
        </ScrollView>
    </View>
    </SafeAreaView>
    )
  }

const styles = StyleSheet.create({
  container : {
      flex : 1,
      backgroundColor : '#F0F2F2',
      paddingBottom : '12%'
  },
  headingContainer : {

  },
  heading : {
      textAlign : 'center',
      paddingVertical : 10,
      fontSize : 30,
      color : '#0B3C58',
      
      fontFamily : 'NewRubrik-Medium'

      
  },
  addVehicle :{
      flex :1,
      justifyContent : 'center',
      paddingHorizontal : 20,
      
  },noFuelContainer : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
      paddingHorizontal : 40
  },
  noFuelHeading : {
      fontSize : 20,
      color : '#0B3C58',
      marginTop : '3%',
      marginBottom : '1%'
  },noFuelSub : {
      textAlign : 'center',
      fontSize :15
  },button : {
      alignItems : 'flex-end',
      position : 'absolute',
      bottom : 0,
      right : 0
  },addVehicleContainer :{
    justifyContent : 'center',
    marginTop : '50%',
    paddingHorizontal : 60
  },scrollContainer :{
    flex :1,
  },cont :{
    borderBottomWidth :0.5,
      borderColor : 'gray',
      marginBottom : 20
  }
})




export default PerformancePage