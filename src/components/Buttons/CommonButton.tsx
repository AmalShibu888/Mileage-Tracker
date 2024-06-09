import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native';
import { FC } from 'react';

interface Props {
  handlePress :()=>void,
  text : string,
  disabled ?: boolean,
  parentStyles ?: {}
}
const CommonButton : FC<Props> = ({text , handlePress ,disabled , parentStyles}) => {
  return (
    <TouchableOpacity style={[disabled ? styles.containerIsDisabled :styles.containerNotDisabled , styles.container , parentStyles]} onPress={disabled ? ()=>{} : handlePress}>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container :{
        paddingVertical : 16,
        paddingHorizontal : 20,
        borderRadius : 8
        
    },
    containerNotDisabled : {
        backgroundColor : '#0B3C58',
    },containerIsDisabled :{
        backgroundColor : '#B0B0B0'
    },text :{
        color :'white',
        textAlign : 'center',
        fontFamily : 'NewRubrik-SemiBold'

    }
})

export default CommonButton