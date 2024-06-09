import React, { useState } from 'react'
import {  StyleSheet , Image ,FlatList , View ,Text, TouchableOpacity , Pressable ,TouchableHighlight} from 'react-native'
import { FC } from 'react';
type listObject ={
    name :string;
    _id : string
}

interface Props {
    name : string;
    type : string;
    Styles ?: {};
    conStyles : number;
    list : listObject[];
    handleSelectChange :(id :string, b : number)=> void;
    open : boolean;
    setOpen : any
}

const PickerVehiclesForm : FC <Props> = ({name , list ,handleSelectChange,conStyles   ,type   , Styles ,open ,setOpen }) => {
    const [first , setFirst] = useState(false);
    const handleButtonPress = ()=>{
        setOpen((state)=>!state)
    }
    const handlePress = (id : string)=>{
        setOpen(false)
        handleSelectChange(type , parseInt(id))
        setFirst(true);
    }
    
      return (
       <View style={styles.container}>
    
        <Pressable onPress={handleButtonPress} style={[styles.button , {width : conStyles}]}>
            <View style={styles.textCon}>
            {first && <Text style={styles.textStyles}>Vehicle Type</Text>}
            <Text style={[styles.buttonText , Styles , !first ? styles.textUnFocused : styles.textFocused]}>{name}</Text>
            </View>
            <Image style ={styles.buttonImage} source={require('../../rcs/downArrow.png')} />
        </Pressable>
    
        {
            open &&
        <View style={[styles.dropDown ]}>
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
        alignItems : 'flex-end',
        marginTop : 10,
        
    },button : {
        height : 52,
        paddingHorizontal: 10,
        backgroundColor : 'white',
        flexDirection : 'row',
        borderRadius : 8,
        alignItems : 'center',
        fontSize: 16,
    },dropDown : {
        position : 'absolute',
        zIndex : 1,
        width : '60%',
        marginTop : 52,
        backgroundColor : 'white'
    },buttonText : {
        textAlign : 'center',
        fontSize: 16,
        width : '100%',
        
      fontFamily : 'NewRubrik-Medium'

    },buttonImage : {
        position : 'absolute',
        right : 10,

    },dropDowntext :{
        fontSize: 16,
        paddingLeft : '4%',
      fontFamily : 'NewRubrik-Medium',
        color : '#0B3C58'
    },dropDownButton :{
        paddingVertical : 16,
    },textUnFocused :{
        color : 'gray',
        paddingHorizontal : 10,
    },textFocused :{
        color : '#0B3C58'
    },textCon :{
    },textStyles :{
        fontSize : 11,
        color : '#6D8A9B',
        fontFamily : 'NewRubrik-Light'

    }
})

export default PickerVehiclesForm