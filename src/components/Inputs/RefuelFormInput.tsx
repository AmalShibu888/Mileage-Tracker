import React, { useState } from 'react'
import { StyleSheet, View,TextInput,Text, Platform} from 'react-native'
import { FC } from 'react';

interface Props {
    handleData :(a : string ,b : string )=>void,
    placeholder : string,
    id : string,
    val : string ,
    Style ?: {}

}
const RefuelFormInput : FC<Props> = ({placeholder ,handleData , id ,val ,Style}) => {

    
    const [focus , setFocus] = useState(()=>val !== placeholder);
    const [value , setValue] = useState(val);

    const handleFocus = ()=>{
        setFocus(true);
        if(value === placeholder)
            setValue('');
    }

    const handleChangeText = (text : string)=>{
        setValue(text);
        handleData(id , text);

    }


    const handleSelectionChange = ()=>{
        
        if(value != null && value.length == 0){
            setFocus(false);
            setValue(placeholder);
        }
    }


  return (
    <View style = {styles.container}>
        {(focus || value !== placeholder)&&
            <Text style={styles.text}>{placeholder}</Text>
        }
        <TextInput onBlur={handleSelectionChange} keyboardType='numeric' onFocus={handleFocus} onChangeText={(text)=>handleChangeText(text)} style={focus ?styles.inputFocused: styles.inputNotFocused} value={value}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        width : '47%',
        borderRadius : 10,
        paddingHorizontal : '2%',
        justifyContent : 'center',
        padding : '1%',
        height : 50,
        ...Platform.select({
            'ios' :{
                height : 50
            }
        })

    },inputNotFocused : {
        fontSize : 16,
        color : 'gray',
      fontFamily : 'NewRubrik-Medium'

    },inputFocused :{
        fontSize : 16,
        padding : '0%',
        color :  '#0B3C58',
      fontFamily : 'NewRubrik-Medium'

    },text : {
        color : '#6D8A9B',
      fontFamily : 'NewRubrik-Light'

    }
})

export default RefuelFormInput