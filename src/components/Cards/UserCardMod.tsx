import React from 'react'
import { View , Image ,Text, StyleSheet, Pressable } from 'react-native'
import { FC } from 'react';
import { UserInterface } from '../../Database/interfaces';

interface Props {
  data :UserInterface,
  handlePress : (a :UserInterface)=>void
}
const UserCardMod : FC<Props> = ({data ,handlePress }) => {
  return (
    <Pressable style={styles.container} onPress={()=>handlePress(data)}>
        <View style={[styles.image , {backgroundColor : data.color}]}>
            <Text style={styles.imageText}>{data.name[0]?.toUpperCase()}</Text>
        </View>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail" >{data.nickname || data.name}</Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    container : {
      alignItems : 'center',
      width : 75,
      marginBottom : 10
    },image :{
        width : 54,
        height : 54,
        borderRadius : 27,
        justifyContent : 'center',
        alignItems : 'center'
    },imageText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 28,
        fontFamily : 'NewRubrik-Medium'
    },text : {
      fontFamily : 'NewRubrik-Medium'

    }
})
export default UserCardMod