import React from 'react'
import { View ,Image ,Text , Button, StyleSheet ,TouchableOpacity} from 'react-native'
import AddButton from './Buttons/AddButton'
import { FC } from 'react';

interface Props {
  handlePress :()=>void,
}
const AddRefuelingData : FC<Props>= ({handlePress }) => {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../rcs/clouds.png')}/>
        <Text style={styles.text}>it's time to add the refueling data to get more insights</Text>
        <AddButton text="Add Refueling" handlePress={handlePress}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    paddingTop : 30,
    alignItems :'center',
  },image : {
    marginBottom : 20
  },text : {
    fontSize : 20,
    marginHorizontal : 30,
    textAlign : 'center',
    marginBottom : 20,
    fontFamily : 'NewRubrik-Medium'
  }
})

export default AddRefuelingData