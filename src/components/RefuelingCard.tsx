import React, { FC, useState } from 'react'
import { StyleSheet, View , Image,Text, Pressable } from 'react-native'
import moment from 'moment'
import { RefuelInterface } from '../Database/interfaces';
import useCurRefuelingStore from '../state/CurRefuelingStore';
import { BSON } from 'realm';
import useRefuelTriggerStore from '../state/RefuelTrigger';

const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];


interface Props{
    navigation : any;
    ind : number;
    data : BSON.ObjectId
}
const RefuelingCard : FC<Props> = ({data , navigation , ind}) => {
    const {refuelDatas} = useRefuelTriggerStore()
    const refuelData = refuelDatas.filter((cur)=>cur._id.equals(data))[0] as NonNullable<RefuelInterface>;
   const {date , fuelConsumed , price} = refuelData;
    const day = dayNames[date.getDay()];
    const formattedDate = moment(date).format('D MMM \'YY');
    const {setCurRefuelState} = useCurRefuelingStore();
    const handleNavigation = ()=>{

        setCurRefuelState(refuelData);
        if(ind == 0)
            navigation.navigate('Refueling' , {screen : 'editingRefuelingData'  });
        else
            navigation.navigate('editingRefuelingData' );

    }
  return (
    <Pressable onPress={handleNavigation} style={styles.container}>
            <View style={styles.top}>
                <Image source={require('../rcs/refuelingData.png')}/>
                <View style={styles.day}>
                    <Text style={[styles.text , styles.dayTop]}>{day} { formattedDate} </Text>
                    <Text style={[styles.text , styles.dayBottom]}>{fuelConsumed}L</Text>
                </View>
            </View>
            <Text style={[styles.text]}>+S${price}</Text>   
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        elevation : 4,
        marginHorizontal  : 18,
        marginVertical  : 8,

        backgroundColor : 'white',
        padding : 15,
        borderRadius : 8,
        alignItems : 'center'

    },text : {
        color : '#0B3C58',
        fontFamily : 'NewRubrik-Medium'
    },top : {
        flexDirection : 'row',
        alignItems : 'center'
    },day :{
        paddingHorizontal : 16
    },dayTop :{
        fontSize : 14
    },dayBottom : {
        fontSize : 11
    }
})

export default RefuelingCard