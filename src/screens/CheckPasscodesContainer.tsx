import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import CheckPassCode from './CheckPassCode'

import { FC } from 'react'
import { UserInterface } from '../Database/interfaces'
import { RouteProp } from '@react-navigation/native'
interface Props {
  route: RouteProp<{ params: { user: UserInterface } }, 'params'>
}

const CheckPasscodesContainer : FC<Props> = ({route}) => {
    const {user} = route.params;
  return (
    <View style={{flex :1}}>
        <CheckPassCode user={user}/>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default CheckPasscodesContainer