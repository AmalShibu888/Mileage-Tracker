import React, { useState } from 'react'
import { StyleSheet, View,TextInput,Text, Dimensions} from 'react-native'
import { FC } from 'react';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
    handleData :(a : string ,b : string )=>void,
    placeholder : string,
    id : string,
    val : string,
    Style ?: {}

}
const AddVehiclesFormInputs : FC<Props>= ({placeholder ,handleData , id ,val }) => {
    const [focus , setFocus] = useState(false);
    useFocusEffect(React.useCallback(()=>{
        setFocus(false);
    },[]))
    const handleFocus = ()=>{
        setFocus(true);
    }

    const handleChangeText = (text : string)=>{
        if(text !== placeholder)
            handleData(id , text);
    }


    const handleSelectionChange = ()=>{
        
        if(val.length == 0){
            setFocus(false);
        }
    }

  return (
    <View style = {styles.container}>
        {(focus || val.length > 0)&&
            <Text style={styles.textStyle}>{placeholder}</Text>
        }
        <TextInput onBlur={handleSelectionChange} keyboardType='numeric' onFocus={handleFocus} onChangeText={(text)=>handleChangeText(text)} style={focus ?styles.inputFocused: styles.inputNotFocused} value={val || focus ? val : placeholder}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        width : Dimensions.get('window').width *0.90,
        borderRadius : 8,
        paddingHorizontal : 10,
        justifyContent : 'center',
        marginTop : 10,
        height : 52

    },inputNotFocused : {
        fontSize : 16,
        color : 'gray',
        padding : 10,
        fontFamily : 'NewRubrik-Medium'

    },inputFocused :{
        fontSize : 16,
        padding : 0,
        color :  '#0B3C58',
      fontFamily : 'NewRubrik-Medium'

    },textStyle :{
        color : '#6D8A9B',
      fontFamily : 'NewRubrik-Light',
      fontSize : 11

    }
})

export default AddVehiclesFormInputs