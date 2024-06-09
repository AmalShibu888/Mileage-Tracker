import React from 'react'
import { View , Image ,Text, StyleSheet, Pressable } from 'react-native'
import { FC } from 'react'
import { UserInterface } from '../Database/interfaces'
interface Props {
  image : number
  data : {name : string}
  handlePress : (a : {name :string})=> void
}
const UserCard : FC<Props> = ({image , data ,handlePress }) => {
  return (
    <Pressable style={styles.container} onPress={()=>handlePress(data)}>
        <Image style={styles.image} source={image}/>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail"  >{data.name}</Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    container : {
      alignItems : 'center',
      width : 75,
      marginBottom : 10
    },image :{
        width : 60,
        height : 60
    },text : {
      fontFamily : 'NewRubrik-Medium'

    }
})
export default UserCard