import React, { useState } from 'react'
import { View  ,StyleSheet, TextInput , Text} from 'react-native'

import { FC } from 'react';

interface Props {
    value : string
    text : string
    required : boolean;
    errorText : string;
    id : number;
    handleInputs :(a : number , b : string)=>void
    validationFun : (a :string)=>boolean
    handleError : (a : number , b : boolean)=>void;
}

const InputWithText : FC<Props> = ({value ,text,required , handleInputs , id, errorText , validationFun , handleError}) => {
    const [error , setError] = useState(false);
    const onChangeInput = (text : string)=>{
        handleInputs(id , text);
        if(required && !text){
            errorText = 'text cannot be empty';
            setError(true);
            handleError(id ,true);
            return;
        }
        setError(!validationFun(text));
        handleError(id ,!validationFun(text));
    } 

    
  return (
    <View style ={styles.container}>
        <Text style={styles.InputText}>{text} {required && <Text style={styles.star}>*</Text>}</Text>
        <TextInput  value={value} style={styles.input} onChangeText={(text) =>{onChangeInput(text)}}/>
        {error && <Text style={styles.error}>{errorText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        marginBottom : 32
    },
    input :{
        marginVertical: 4,
        borderWidth: 1,
        paddingVertical: '3%',
        paddingHorizontal : '3%',
        backgroundColor : 'white',
        borderColor : 'white',
        borderRadius : 5,
        width : "95%",
        fontSize : 16
    },InputText :{
        color : 'black',
        fontSize : 20,
        fontFamily : 'NewRubrik-Medium'
    },star :{
        color : 'crimson'
    },error :{
        color : 'crimson',
        marginTop : 5
    }

})

export default InputWithText