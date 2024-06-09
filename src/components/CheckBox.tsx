import React, { useState } from 'react'
import { StyleSheet, Pressable ,Text} from 'react-native'
import { FC } from 'react';
import { useFocusEffect } from '@react-navigation/native';
interface Props {
    setChecked : (b :(a :boolean)=>boolean | boolean)=>void;
}

const CheckBox : FC<Props> = ({setChecked}) => {

    useFocusEffect(React.useCallback(()=>{
        setmarked(false);
        setChecked((val)=>false);
    } , []))
    
    const [marked , setmarked] = useState(false);
    const handlePress = ()=>{
        setmarked((val)=>!val)
        setChecked((val)=>!val)
    }

    
  return (
    <Pressable onPress={handlePress} style={[styles.container ,marked && styles.checked ]}>
        <Text style={styles.text}>✓</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container : {
        width : 20,
        height : 20,
        borderColor : 'black',
        borderWidth : 2,
        borderRadius : 3,
        marginRight: 10,
        alignItems :'center'
    },checked : {
        backgroundColor : '#F18484',
        borderColor : '#F18484'
    },text : {
        color : 'white',
        fontFamily : 'NewRubrik-Medium'
    }
})

export default CheckBox