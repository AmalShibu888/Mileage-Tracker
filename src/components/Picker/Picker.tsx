import React, { useState } from 'react'
import {  StyleSheet , Image  , View ,Text , Pressable ,TouchableHighlight} from 'react-native'

import { FC } from 'react';
import { BSON } from 'realm';
import { useFocusEffect } from '@react-navigation/native';
type vehicleObject =  {
        readonly _id :  BSON.ObjectId ,
        name : string,

}

interface Props {
    placeholder ?: string,
    name : string,
    Styles ?: {}
    conStyles : number,
    list : vehicleObject[] ,
    handleSelectChange :(id :BSON.ObjectId )=> void,
    open : boolean,
    setOpen : any
}
const Picker : FC<Props> = ({name, list ,handleSelectChange ,conStyles  , Styles , open , setOpen}) => {


useFocusEffect(React.useCallback(
  () => {
    setOpen(false);
  },
  [],
)
)
const handleButtonPress = ()=>{
    setOpen((state)=>!state)
}
const handlePress = (id :BSON.ObjectId )=>{
    setOpen(false)
    handleSelectChange(id);
        
}

  return (
   <View style={styles.container}>

    <Pressable onPress={handleButtonPress} style={[styles.button , {width : conStyles}]}>
        <Text numberOfLines={1}  style={[styles.buttonText , Styles]}>{name}</Text>
        <Image style ={styles.buttonImage} source={require('../../rcs/downArrow.png')} />
    </Pressable>

    {
        open &&
    <View style={[styles.dropDown , {width : conStyles}]}>
        {
            list.map((item)=>(
                <TouchableHighlight onPress={()=>handlePress(item._id )} key={item._id.toString()} underlayColor='#D9F0F1' style={styles.dropDownButton}><Text numberOfLines={1} style={styles.dropDowntext}>{item.name}</Text></TouchableHighlight>
            ))

        }
    </View>}
   </View>
  )
}
const styles = StyleSheet.create({
    container :{
        zIndex : 10,
        alignItems : 'center',
        marginTop : 20
    },button : {
        paddingVertical: 12,
        paddingRight : 16,
        backgroundColor : 'white',
        borderRadius : 10,
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row'
    },dropDown : {
        position : 'absolute',
        zIndex : 10,
        marginTop : 50,
        backgroundColor : 'white'
    },buttonText : {
        paddingHorizontal : 16,
        fontSize: 16,
        color : '#0B3C58',
      fontFamily : 'NewRubrik-Medium',
        width : '90%'
    },buttonImage : {

    },dropDowntext :{
        fontSize: 16,
        paddingLeft : 16,
        color : '#0B3C58',
        fontFamily : 'NewRubrik-Medium',

    },dropDownButton :{
        paddingVertical : 16,
    }
})

export default Picker;