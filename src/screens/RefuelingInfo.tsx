import { useQuery, useRealm } from '@realm/react';
import React, { useEffect } from 'react'
import { View  ,Text, StyleSheet , Image ,Pressable ,Dimensions, SafeAreaView} from 'react-native'
import { Vehicles } from '../Database/models/VehiclesSchema';
import useUserStore from '../state/Users';
import { useState } from 'react';
import AddVehicle from '../components/AddVehicle';
import RNPickerSelect from 'react-native-picker-select';
import useVehicleStore from '../state/Vehicles';
import { Refueling } from '../Database/models/RefuelingSchema';
import RefuelingBox from '../components/RefuelingBox';
import useRefuelTriggerStore from '../state/RefuelTrigger';
import useVehicleArrayStore from '../state/VehiclesArray';
import Picker from '../components/Picker/Picker';
import { FC } from 'react';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabParamList, StackParamList, vehicleStackParamList } from '../types/Types'
import { CompositeScreenProps } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { RefuelInterface, VehicleInterface } from '../Database/interfaces';
import { BSON } from 'realm';
interface Props {

    navigation : any
}
  
 
const RefuelingInfo : FC<Props> = ({navigation}) => {
    const { VehiclesArray }  : any  = useVehicleArrayStore();
    const { BSON, ObjectId } = require('bson');
    const realm = useRealm();
    const {vehId , name ,setVehicle} :any = useVehicleStore();
    const {refuelDatas , setRefuelState } : any = useRefuelTriggerStore();
    
    useEffect (()=>{
        getRefuelingDataOfVeh();
    }, [])

    const getRefuelingDataOfVeh = ()=>{
            const curRefuelingData = realm.objects<RefuelInterface>('Refueling').filtered('vehId == $0' , vehId).sorted('date' , true);
            setRefuelState({curVehId : vehId , refuelDatas : [...curRefuelingData]});
    }
    
    const handleSelectChange = (value  : BSON.ObjectId)=>{
        const objectId = new ObjectId(value);
        const obj = realm.objects<VehicleInterface>('Vehicles').filtered('_id == $0' , objectId)[0];
        setVehicle({name : obj?.name , type : obj?.type , engine : obj?.engine , userId : obj?.userId , vehId : obj?._id , image : obj?.image});
        const curRefuelingData = realm.objects(Refueling).filtered('vehId == $0' , value).sorted('date' , true);
        setRefuelState({curVehId : value , refuelDatas : [...curRefuelingData]});
    }

    const navigateToVehicleForm = ()=>{
        navigation.navigate('Vehicles' , {screen : 'addVehiclesForm'})
    }

    const navigateToRefuelingForm = ()=>{
        navigation.navigate('refuelingForm' );
    }
    const [open1 , setOpen1] = useState(false);
    const [open , setOpen] = useState(false);
  return (
    <Pressable style={{flex : 1}} onPress={()=>{setOpen(false) ;setOpen1(false)}}>
    <SafeAreaView style={{flex : 1}}>
    <View style={styles.container}>
        
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>Refueling</Text>
            {
                VehiclesArray.length > 0 &&(
                     <Picker open={open} setOpen={setOpen} name={name} list={VehiclesArray} handleSelectChange={handleSelectChange} conStyles={300}/>
                    
                )
            }
        </View>
        {
            VehiclesArray.length == 0 ?
            (
                <View style={styles.addVehicle}>
                    <AddVehicle handlePress={navigateToVehicleForm}/>
                </View>
            ):refuelDatas.length == 0 ?(
        
                <View style={styles.noFuelContainer}>
                    <Image source={require('../rcs/clouds.png')}/>
                    <Text style={styles.noFuelHeading}>No refuelling records yet!</Text>
                    <Text style={styles.noFuelSub}>Add a record using the + button below to begin your wealthcare journey</Text>
                    <Pressable onPress={navigateToRefuelingForm} style ={styles.button}>
                        <Image style={styles.image} source={require('../rcs/AddUser.png')} />
                    </Pressable>
                </View> 
            ): (<View style = {styles.refuelingDatas}>
                    <View style={styles.refulingBox}>
                    <RefuelingBox navigation={navigation} open={open1} setOpen={setOpen1}/>
                    </View>
                    <Pressable onPress={navigateToRefuelingForm} style ={styles.button}>
                        <Image style={styles.image} source={require('../rcs/AddUser.png')} />
                    </Pressable>
                </View>
            )
                
        }
        
        
    </View>
    </SafeAreaView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#F0F2F2',
        alignItems : 'center',
        paddingBottom : '12%',
    },
    headingContainer : {
        borderBottomColor :' gray',
        borderBottomWidth :0.5,
        alignItems : 'center',
        width : Dimensions.get('window').width,
        paddingBottom : 10,
        zIndex : 1
    },
    heading : {
        textAlign : 'center',
        paddingVertical : 10,
        fontSize : 30,
        color : '#0B3C58',
      fontFamily : 'NewRubrik-Medium'

        
    },
    addVehicle :{
        flex :1,
        justifyContent : 'center',
        paddingHorizontal : 20,
        width : '70%'
    },noFuelContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        paddingHorizontal : 40,
        flexGrow : 1
    },
    noFuelHeading : {
        fontSize : 20,
        color : '#0B3C58',
        marginTop : 20,
        marginBottom : 10,
      fontFamily : 'NewRubrik-Medium'

    },noFuelSub : {
        textAlign : 'center',
        fontSize :15,
      fontFamily : 'NewRubrik-Medium'

    },button : {
        alignItems : 'flex-end',
        position : 'absolute',
        bottom : 0,
        right : 0
    },image : {
    },refuelingDatas : {
        flexGrow : 1,
    },refulingBox :{
        height : '80%'
    }
})




export default RefuelingInfo