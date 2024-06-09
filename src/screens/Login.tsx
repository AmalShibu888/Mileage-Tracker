import React from 'react'
import { View ,Image , Text, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import {useRealm , useQuery} from '@realm/react';
import {Users} from '../Database/models/UsersSchema'
import UserCard from '../components/UserCard';
import useUserStore from '../state/Users';
import LinearGradient from 'react-native-linear-gradient';
import { Vehicles } from '../Database/models/VehiclesSchema';
import useVehicleArrayStore from '../state/VehiclesArray';
import UserCardMod from '../components/Cards/UserCardMod';
import useVehicleStore from '../state/Vehicles';
import { FC } from 'react';
import { UserInterface, VehicleInterface } from '../Database/interfaces';

interface Props 
{
    navigation : any
}
const sampleUser = require('../rcs/sampleUser.png');
const addUser = require('../rcs/AddUser.png');
const Login : FC<Props> = ({navigation}) => {
    const realm = useRealm();
    const users : any = useQuery(Users);
    const {setUser} = useUserStore()
    const {setVehicleState} = useVehicleArrayStore();
    const { setVehicle} = useVehicleStore();
    const goToHomePage = (data : UserInterface)=>{
        if(data.passcode)
            navigation.navigate('checkPasscodeContainer' ,{user :data})
        else{
            setUser({name : data.name , id : data._id , nickname : data.nickname , passcode : data.passcode , email : data.email});
            realm.write(()=>{
                const toUpdate = realm.objects<UserInterface>('Users').filtered('active == $0' , true);
                if(toUpdate[0] != null)
                  toUpdate[0].active = false;
                const toUpdate1 = realm.objects<UserInterface>('Users').filtered('_id == $0' , data._id)[0];
                if(toUpdate1)
                    toUpdate1.active = true;
            })
            navigation.navigate('tabNavigation');
            
            const vehicles = realm.objects<VehicleInterface>('Vehicles').filtered('userId == $0' , data._id);
            if(vehicles[0])
                setVehicle({name : vehicles[0].name , engine : vehicles[0].engine , vehId : vehicles[0]._id , userId : vehicles[0].userId , type : vehicles[0].type , image : vehicles[0].image});
            setVehicleState({VehiclesArray : [...vehicles]});
        }
    }

    const goToCreateAccount = ()=>{
        navigation.navigate('createAccount' , {loc :'login'});  
    }
  return (
    <LinearGradient style={{flex : 1}}  colors={['#C5E3DC', '#F6F6EC']} >
        <SafeAreaView style={{flex : 1}}>
        <View style={styles.container}>
            <View style={styles.top}>
                <Image source={require('../rcs/logo.png')} />
                <Text style={styles.heading}>Mileage Tracker</Text>
            </View >
                <View style={styles.bottom}>
                    <Text style={styles.bottomHeading}>Who are you?</Text>

                    <View style={styles.userContainer}>
                        {
                            users.map((user : UserInterface , index : number)=>(<UserCardMod key={index} data={user} handlePress={goToHomePage} />))
                        }
                            <UserCard image={addUser} data={{name : 'Add User'}} handlePress={goToCreateAccount}/>  

                    </View>
                </View>
            <View>

            </View>
        </View>
        </SafeAreaView>
        </LinearGradient>
  )
}


const styles = StyleSheet.create({
    container : {
        flex : 1
    },top : {
        marginTop : 25,
        alignItems : 'center',
        flex : 0.6
    },heading : {
        fontSize : 30,
        color : '#FF4E4E',
      fontFamily : 'NewRubrik-Medium',
        paddingTop : 15
    },bottom : {
        flex : 0.3,
        alignItems : 'center'
    },bottomHeading : {
        textAlign : 'center',
        fontSize : 24,
      fontFamily : 'NewRubrik-Medium'

    },userContainer : {
        width : 280,
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'space-evenly',
        marginTop : 20
    }
})


export default Login