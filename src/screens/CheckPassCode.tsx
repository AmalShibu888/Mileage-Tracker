import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import PasscodeEntry from '../components/PasscodeEntry1'
import { StyleSheet , Text,View} from 'react-native'
import { useState } from 'react'
import useUserStore from '../state/Users'
import { useNavigation } from '@react-navigation/native'
import { useRealm } from '@realm/react'
import { Users } from '../Database/models/UsersSchema'
import useVehicleArrayStore from '../state/VehiclesArray'
import { Vehicles } from '../Database/models/VehiclesSchema'
import useVehicleStore from '../state/Vehicles'
import { FC } from 'react'
import { UserInterface, VehicleInterface } from '../Database/interfaces'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '../types/Types'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props{
    user :UserInterface
}

const CheckPassCode : FC<Props> = ({user}) => {
    const {setVehicleState} = useVehicleArrayStore();
    const realm = useRealm();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList ,'checkPasscodeContainer' >>();
    const {setUser}  = useUserStore();
    const [data , setData] = useState("");
    const {setVehicle} = useVehicleStore();
    useEffect(()=>{
        submit();
    }, [data]);

    

    const validate = ()=>{
        for(let i = 0;i<4;i++){
            if(data[i] !== user.passcode[i])
                return false;
        }
        return true;
    }

    const submit = ()=>{
        if(data.length == 4 && validate()){
            realm.write(()=>{
                const toUpdate = realm.objects<UserInterface>('Users').filtered("_id == $0" ,user._id) 
                if(toUpdate[0] != null)
                    toUpdate[0].active  = true ;
            })
            setUser({name : user.name , id : user._id , nickname : user.nickname , passcode : user.passcode , email : user.email});
            const vehicles = realm.objects<VehicleInterface>('Vehicles').filtered('userId == $0' , user._id);

            setVehicleState({VehiclesArray : [...vehicles]});
            if(vehicles[0] != null)
                setVehicle({name : vehicles[0].name , engine : vehicles[0].engine , vehId : vehicles[0]._id , userId : vehicles[0].userId , type : vehicles[0].type , image : vehicles[0].image});
            navigation.navigate('tabNavigation');
        }
    }

    const getData = (curData : string)=>{
        setData(curData);
    }
    const handleFullFill = (val : any)=>{
        val.setState({ code : '' })
    }
    
  return (
    <View style={styles.container}>
    <LinearGradient style={{flex : 1}}  colors={['#C5E3DC', '#F6F6EC']} >
    <SafeAreaView style={{flex : 1}}>
            <View style={styles.body}>
            <Text style={styles.heading}>Welcome back!</Text>
            <PasscodeEntry getData={getData} handleFullFill={handleFullFill} heading="Enter your 4-Digit Passcode" isfocused={true} subtitle="Just checking it's really you!"/>
            </View>
        </SafeAreaView>
    </LinearGradient>
    </View>
  )
}


const styles = StyleSheet.create({
    heading : {
        fontSize : 22,
        marginTop : 100,
        fontWeight : 'bold',
        marginBottom : 20,
        color : '#0B3C58',
      fontFamily : 'NewRubrik-Medium'

    },container : {
        flex : 1,
    },body :{
        paddingLeft : 20

    }
})

export default CheckPassCode