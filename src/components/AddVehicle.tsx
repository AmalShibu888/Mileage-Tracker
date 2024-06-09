import React from 'react'
import { StyleSheet, View ,Text , Button , Image ,TouchableOpacity } from 'react-native'
import { ArrowRight } from 'react-native-feather'
import AddButton from './Buttons/AddButton'
import { FC } from 'react';

interface Props {
  handlePress :()=>void,
}
const AddVehicle  :FC<Props> = ({  handlePress}) => {
  return (
    <View style={styles.container}>
            <Image source={require('../rcs/dummyVehicle.png')} />
            <Text style={styles.vehAdd}>Add vehicles to start tracking its fueling and performance</Text>
            <AddButton text="Add Vehicle" handlePress={handlePress}/>
    </View>
  )
}

const styles = StyleSheet.create({
    vehAdd : {
        textAlign : 'center',
        fontSize : 15,
        color : '#0B3C58',
        marginTop : 20,
        marginBottom : 10,
        fontFamily : 'NewRubrik-Medium'
    },container : {
      alignItems : 'center'
    },
})

export default AddVehicle