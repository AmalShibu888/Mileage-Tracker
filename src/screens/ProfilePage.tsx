import { useQuery, useRealm } from '@realm/react'
import React, { useEffect, useState } from 'react'
import { View ,Image, StyleSheet,Text ,Button , ScrollView, Pressable } from 'react-native'  
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
import ProfilePageWithVehicle from './ProfilePageWithVehicle';
import ProfilePageWithOutVehicles from './ProfilePageWithOutVehicles';
import R from "../rcs/1.svg"
interface Props{
  navigation : any
}
const ProfilePage : FC<Props> = ({navigation}) => {
    const {name , setUser} = useUserStore();
    const {VehiclesArray} = useVehicleArrayStore();
    const {setVehicle} = useVehicleStore();
    const {setVehicleState} = useVehicleArrayStore();
    const realm = useRealm();
    useEffect(()=>{

        if(!name){
            const activeUser = realm.objects<UserInterface>('Users').filtered('active == $0' , true)[0];
            if(activeUser)
                setUser({name : activeUser.name , nickname : activeUser.nickname , email : activeUser.email , id : activeUser._id , passcode : activeUser.passcode});
        
                const vehicles = realm.objects<VehicleInterface>('Vehicles').filtered('userId == $0' , activeUser?._id);
            if(vehicles[0])
                setVehicle({name : vehicles[0].name , engine : vehicles[0].engine , vehId : vehicles[0]._id , userId : vehicles[0].userId , type : vehicles[0].type , image : vehicles[0].image});
            setVehicleState({VehiclesArray : [...vehicles]});
       }
    },[])


  return (
    <Pressable style={styles.container}>
            {
            VehiclesArray.length !== 0  ? (
                <ProfilePageWithVehicle navigation={navigation}/>
                ) :(
                    <ProfilePageWithOutVehicles navigation={navigation} />


                )
        }
        </Pressable>

  )
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingBottom : '12%',
        backgroundColor: '#D0EAEA',  
 
    },
    header : {
        flexDirection : "row",
        marginTop : 30,
        marginLeft : 20
    },image2 : {
        marginLeft : 130
    },greeting : {
        color : "crimson",
        fontSize : 30,
        fontFamily : 'NewRubrik-Medium'

    },medium :{
        alignItems : 'center',
        padding : 20,
    }
})

export default ProfilePage