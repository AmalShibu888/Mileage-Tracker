import React from 'react'

import { StyleSheet , TouchableOpacity , Text } from 'react-native'
import { ArrowRight } from 'react-native-feather'
import { FC } from 'react';

interface Props {
  handlePress :()=>void,
  text : string
}
const AddButton : FC<Props> = ({handlePress ,text }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>{text}</Text>
              <ArrowRight width={16} height={16} stroke='white'/>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button : {
        backgroundColor : '#0B3C58',
        flexDirection : 'row',
        padding : 12,
        borderRadius : 8,
        alignItems :'center',
        width : 139,
        justifyContent :'space-between'
      },buttonText :{
        color :'white',
        fontSize :16,
        fontFamily : 'NewRubrik-Medium'

      }
})

export default AddButton