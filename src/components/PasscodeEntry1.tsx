import React, { useRef, useState } from 'react'
import { View  , StyleSheet, TextInput, Text  } from 'react-native'
import PasscodeIput from './PasscodeInput';
import { FC } from 'react';
interface Props {
    heading : string;
    subtitle : string;
    isfocused : boolean;
    handleFullFill ?: (a ?: any)=>void
    getData : (a : string)=>void
}
const passcode = ['' , '' ,'' ,''];
const PasscodeEntry :FC<Props>= ({getData,heading , subtitle ,isfocused, handleFullFill}) => {



  return (
    <View style={styles.container} >
            <Text style={styles.passHeading}>{heading} <Text style = {styles.star}>*</Text></Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                <PasscodeIput  isfocused={isfocused} getData={getData} handleFullFill={handleFullFill}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        marginBottom : 15,
    },
 passHeading : {
        fontSize : 20,
        color : '#0B3C58',
        marginBottom : 5,
        fontFamily : 'NewRubrik-Medium'
    },star :{
        color : 'crimson'
    },subtitle : {
        marginBottom : 10,
        color : '#6D8A9B',
        fontFamily : 'NewRubrik-Medium'
    }
})

export default PasscodeEntry