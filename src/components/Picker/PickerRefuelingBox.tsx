import React, { useState } from 'react'
import {  StyleSheet , Image ,FlatList , View ,Text, TouchableOpacity , Pressable ,TouchableHighlight} from 'react-native'

import { FC } from 'react';
import { BSON } from 'realm';
interface RNPInterface  {
    name : string;
    _id : number,
   
}

interface Props {
    placeholder ?: string,
    name : string,
    Styles ?: {}
    conStyles : number,
    list : RNPInterface[] ,
    handleSelectChange :(id :BSON.ObjectId | number)=> void,
    open : boolean,
    setOpen : any
}
const PickerRefuelingBox : FC<Props> = ({name, list ,handleSelectChange ,conStyles  ,open , setOpen, Styles}) => {


const handleButtonPress = ()=>{
    setOpen((state)=>!state)
}
const handlePress = (id :number )=>{
    setOpen(false)
    handleSelectChange(id);
        
}

  return (
   <View style={styles.container}>

    <Pressable onPress={handleButtonPress} style={[styles.button , {width : conStyles}]}>
        
        <Text style={[styles.buttonText , Styles]}>{name}</Text>
        <Image style ={styles.buttonImage} source={require('../../rcs/downArrow.png')} />
    </Pressable>

    {
        open &&
    <View style={[styles.dropDown , {width : conStyles}]}>
        {
            list.map((item)=>(
                <TouchableHighlight onPress={()=>handlePress(item._id )} key={item._id.toString()} underlayColor='#D9F0F1' style={styles.dropDownButton}><Text style={styles.dropDowntext}>{item.name}</Text></TouchableHighlight>
            ))

        }
    </View>}
   </View>
  )
}
const styles = StyleSheet.create({
    container :{
        zIndex : 1,
        alignItems : 'center',
        marginTop : 20,
    },button : {
        paddingVertical: 12,
        backgroundColor : 'white',
        flexDirection : 'row',
        borderRadius : 10,
        alignItems : 'center'
    },dropDown : {
        position : 'absolute',
        zIndex : 1,
        marginTop : 50,
        backgroundColor : 'white'
    },buttonText : {
        fontSize: 16,
        width : '100%',
        color : '#0B3C58',
        paddingLeft : 16,
    },buttonImage : {
        position : 'absolute',
        right : 10,

    },dropDowntext :{
        fontSize: 16,
        paddingLeft : 16,
        color : '#0B3C58'
    },dropDownButton :{
        paddingVertical : 16,
    }
})


export default PickerRefuelingBox


