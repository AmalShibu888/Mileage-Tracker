import React, { useEffect } from 'react'
import { View  , StyleSheet , Image} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FC } from 'react';

interface Props {
  navigation: NavigationProp<any>;
}
const logo  = require('../rcs/logo.png');
const Splash :FC<Props> = ({navigation}) => {


  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('signUp');
    } , 2000)
  } , [])
  return (
    <View style={styles.container}>
        <Image source={logo} />    
    </View>
  )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor:'#F55858',
        justifyContent: 'center',
        alignItems : 'center'
    }
})

export default Splash