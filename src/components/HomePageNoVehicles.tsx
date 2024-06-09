import React from 'react'
import { StyleSheet, View ,Text } from 'react-native'
import AddVehicle from './AddVehicle'
import { FC } from 'react';
interface Props {
  handlePress : ()=>void;
}

const HomePageNoVehicles : FC<Props> = ({handlePress}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>Track your miles towards a prosperous financial journey!</Text> 
        <View style={styles.addVehicleContainer}>
          <AddVehicle handlePress={handlePress}  />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    welcome : {
        fontSize : 17,
        textAlign : 'center',
        marginBottom : 80,
        paddingHorizontal : 20,
        fontFamily : 'NewRubrik-Medium'
      
    },bottom : {
        alignItems : 'center',
    },addVehicleContainer : {
      width : '70%'
    },container : {
      alignItems : 'center'
    }
    
})

export default HomePageNoVehicles