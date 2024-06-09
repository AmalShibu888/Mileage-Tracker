import React from 'react'
import { Pressable ,Image} from 'react-native'
import { FC } from 'react';
import { StackParamList } from '../types/Types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
interface Props {
  handlePress ?:()=>void,
  navigation : NativeStackNavigationProp<StackParamList, 'createAccount' ,'editingRefuelingData'>
  style ?: {} 
}
const BackButton : FC<Props> = ({handlePress ,navigation  , style}) => {
  return (
    <Pressable onPress={handlePress ? handlePress : () =>navigation.goBack()}>
        <Image  style={style} source={require('../rcs/lArrow.png')} />
    </Pressable>
  )
}

export default BackButton