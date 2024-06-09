import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet ,Pressable , Image , ScrollView, SafeAreaView } from 'react-native'
import VehicleCard from '../components/VehicleCard'
import AddVehicle from '../components/AddVehicle'
import useVehicleArrayStore from '../state/VehiclesArray'
import { FC } from 'react'
interface Props {
  navigation : any
}

const VehiclesInfo :FC<Props> = ({navigation}) => {
  const {VehiclesArray} = useVehicleArrayStore();
  const handlePress = ()=>{
    navigation.navigate('addVehiclesForm')
  }
  const navigateToForm = ()=>{
    navigation.navigate('addVehiclesForm')
  }
  
  return (
    <SafeAreaView style={{flex : 1}}>
    <View style={styles.container}>
      <View style={styles.cont}>
        <Text style={styles.heading}>Vehicles</Text>
        </View>
        
        {
          VehiclesArray.length === 0 ?
          (
            <View style={styles.addvehicleContainer}>
              <AddVehicle handlePress={navigateToForm}/> 
            </View >
              ):(
            <ScrollView style={styles.cardContainer}>
              <View style={styles.cardContainerStyles}>
            {
                VehiclesArray.map((vehicle)=><VehicleCard key={vehicle._id.toString()} data={vehicle}/>)
            }
            </View>
            </ScrollView>
           )
          }
          <Pressable onPress={handlePress} style ={styles.button}>
            <Image source={require('../rcs/AddUser.png')} />
          </Pressable>
        
        
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#F0F2F2',
    paddingBottom : '12%'

  },heading : {
    fontSize : 30,
    fontFamily : 'NewRubrik-Medium',
    color : '#0B3C58',
    textAlign : 'center',
    paddingVertical : '3%',
  },cardContainer : {
      marginTop : 20,
  },button : {
      position : 'absolute',
      bottom : 50,
      right : 0,
  },addvehicleContainer :{
     flex : 1,
     justifyContent : 'center',
     padding : 30
  },cardContainerStyles :{
    alignItems :'center',
    
  },cont :{
    borderBottomColor : 'black',
    borderBottomWidth : 0.5,
  }
})

export default VehiclesInfo