import React from 'react'
import { TouchableOpacity ,Text, StyleSheet } from 'react-native'
import { FC } from 'react';

interface Props {
  handlePress :()=>void,
  text : string,
  parentStyles : {}
}

const HollowButton : FC<Props> = ({text ,handlePress ,parentStyles}) => {
  return (
    <TouchableOpacity style={[styles.container , parentStyles]} onPress={handlePress}>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container :{
        paddingVertical : 16,
        paddingHorizontal : 20,
        borderRadius : 8,
        borderColor :'#0B3C58',
        borderWidth : 2
    },text :{
        color :'#0B3C58',
        textAlign : 'center',
        fontWeight: 'bold',
        fontFamily : 'NewRubrik-Medium'

    }
})

export default HollowButton