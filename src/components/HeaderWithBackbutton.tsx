import React from 'react'
import { View  ,Image, StyleSheet, Pressable} from 'react-native'
import { FC } from 'react';
interface Props {
  handlePress : ()=>void;
}

const HeaderWithBackbutton : FC<Props> = ({handlePress}) => {
  return (
    <View style={styles.container}>
        <Pressable onPress={handlePress} style={styles.backButtonContainer}></Pressable>
        <Image style={styles.image} source={require('../rcs/headerwithbackbutton.png')} />
    </View>
  )
}
const styles = StyleSheet.create({
    backButtonContainer : {
        width : 40,
        height : 40,
        position : 'absolute',
        left : 15,
        top : 25,
        zIndex : 1

    },image : {
      width : '100%'
    },container :{
      width : '100%'
    }
})

export default HeaderWithBackbutton