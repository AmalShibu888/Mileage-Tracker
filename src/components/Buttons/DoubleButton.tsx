import React from 'react'
import { StyleSheet, TouchableOpacity ,View  } from 'react-native'

import HollowButton from './HollowButton'
import CommonButton from './CommonButton'
import { Dimensions } from 'react-native'
import { FC } from 'react';

interface Props {
  handlehollowPress :()=>void,
  handleSolidPress :()=>void,
  textHollow : string,
  solidDisabled ?: boolean,
  parentStyles ?: {},
  textSolid : string
}
const DoubleButton : FC<Props> = ({textHollow, handlehollowPress, handleSolidPress,
solidDisabled , textSolid}) => {
  return (
    <View style={styles.container}>
        <HollowButton parentStyles={styles.ButtonStyles} text={textHollow}  handlePress={handlehollowPress}/>
        <CommonButton parentStyles={styles.ButtonStyles} text={textSolid} disabled={solidDisabled} handlePress={handleSolidPress}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        justifyContent :'space-between',
        flexDirection :'row',
        width : "100%",
        paddingHorizontal : 20
    },ButtonStyles :{
        width : '49%'
    }
})

export default DoubleButton