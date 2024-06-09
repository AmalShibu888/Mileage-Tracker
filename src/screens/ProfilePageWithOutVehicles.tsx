
import { useQuery, useRealm } from '@realm/react'
import React, { useEffect, useState } from 'react'
import { View ,Image, StyleSheet,Text ,Button , ScrollView, Pressable, SafeAreaView } from 'react-native'  
import useUserStore from '../state/Users';
import { Vehicles } from '../Database/models/VehiclesSchema';
import HomePageNoVehicles from '../components/HomePageNoVehicles';
import HomePageWithVehicles from '../components/HomePageWithVehicles';
import LinearGradient from 'react-native-linear-gradient';
import { Users } from '../Database/models/UsersSchema';
import useVehicleArrayStore from '../state/VehiclesArray';
import useVehicleStore from '../state/Vehicles';
import { FC } from 'react';
import { UserInterface, VehicleInterface } from '../Database/interfaces';

interface Props{
  navigation : any
}
const ProfilePageWithOutVehicles: FC<Props> = ({navigation}) => {
    const {name , nickname } = useUserStore();
    const realm = useRealm();



    const    addVehicles = ()=>{
        navigation.navigate('Vehicles',{screen : 'addVehiclesForm'});
    }
  return (
    
    <LinearGradient style={{flex : 1}}   colors={['#C5E3DC', '#F6F6EC']} >
         <SafeAreaView style={{flex : 1}}>
    <ScrollView >
                <Pressable style={styles.logo} onPress={() =>navigation.openDrawer()}>
                    <Image source={require('../rcs/dummyProfile.png')}/>
                </Pressable>
            <View style={styles.header}>
                
                <Image style={styles.image2} source={require('../rcs/logo2.png')}/>
            </View>
            <View style={styles.medium}>
                <Text style={styles.greeting}>Hi {nickname || name}</Text>
                
            </View>
                    <HomePageNoVehicles handlePress={addVehicles}/>
        </ScrollView>
        </SafeAreaView>
    </LinearGradient>
    
  )
}

const styles = StyleSheet.create({
    logo : {
    
        position : 'absolute',
        top : 30,
        left : 8,
        zIndex : 1
    },
    header : {
        marginTop : 30,
        alignItems : 'center'
    },image2 : {
    },greeting : {
        color : "crimson",
        fontSize : 30,
        fontFamily : 'NewRubrik-Medium'

    },medium :{
        alignItems : 'center',
        padding : 20,
    }
})

export default ProfilePageWithOutVehicles