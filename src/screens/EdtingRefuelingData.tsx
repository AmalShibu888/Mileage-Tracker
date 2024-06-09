import React, { useState } from 'react'
import { StyleSheet, View ,Text ,Image ,Button, Dimensions , Pressable, SafeAreaView} from 'react-native'
import BackButton from '../components/BackButton'
import useVehicleStore from '../state/Vehicles'
import moment from 'moment'
import TwoTexts from '../components/TwoTexts'
import { useRealm } from '@realm/react'
import ModalContainer from '../components/ModalContainer'
import { Refueling } from '../Database/models/RefuelingSchema'
import HollowButton from '../components/Buttons/HollowButton'
import useRefuelTriggerStore from '../state/RefuelTrigger'

import { FC } from 'react'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {  refuelingStackParamList } from '../types/Types'
import { RefuelInterface } from '../Database/interfaces';
import useCurRefuelingStore from '../state/CurRefuelingStore'
interface Props {
  navigation : any
}


const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const EdtingRefuelingData : FC<Props>= ({ navigation}) => {
    const {removeRefuelData} = useRefuelTriggerStore();
    const {date , fuelConsumed , odometerStart , odometerEnd , price , curDate, _id ,vehId , userId} = useCurRefuelingStore();

    const day = dayNames[date.getDay()];
    const {name} = useVehicleStore();
    const realm = useRealm();
    const [modalVisible , setModalVisible] = useState(false);
    const handleDelete = ()=>{
        setModalVisible(true);
        
    }
    const handleAccept = ()=>{
        removeRefuelData(_id);

        const toDelete = realm.objects(Refueling).filtered('_id == $0' , _id);

        realm.write(()=>{
            realm.delete(toDelete);
        });
        
        navigation.navigate('refuelingInfo');
    }

    const handleReject = ()=>{
        setModalVisible(false);
    }

    
    const handleEdit = ()=>{
        navigation.navigate('editingRefuelingForm' , {info : {date , fuelConsumed , odometerStart , odometerEnd , price , curDate, _id ,vehId , userId}});
    }

  return (
    
    <View style={styles.container}>
            <SafeAreaView style={styles.container}>
            <ModalContainer modalVisible={modalVisible} modaltext="Are you sure you want to delete this refueling record" handleAccept={handleAccept} handleReject={handleReject}/>
            <View style={styles.top}>
                <View style={styles.toptop}>
                    <BackButton handlePress={()=>navigation.navigate('refuelingInfo')} navigation={navigation} />
                    <Text style={[styles.text ,styles.textTop]}>{day}, {moment(date).format('D MMM \'YY')}</Text>
                    <Pressable onPress={handleDelete}>
                        <Image source={require('../rcs/deleteRefueling.png')}/>
                    </Pressable>
                    
                </View>
                
                <Text style={[styles.text , styles.textMid]}>{name}</Text>
                <Text style={styles.textBot}>Added on {moment(curDate).format('D MMM \'YY')}</Text>
            
                
            </View>
            <View style={styles.circle}>
            <View style={styles.middle}>
                <View style={styles.twoTextContainer}>
                    <TwoTexts text1='Start Reading' text2={`${odometerStart} Kms`}/>
                    <TwoTexts text1='End Reading' text2={`${odometerEnd} Kms`}/>
                    <TwoTexts text1='Consumed' text2={`${fuelConsumed} L`}/>
                    <TwoTexts text1='Price' text2={`S$${price}`}/>
                </View>
            </View>
            <View style={styles.bottom}>
                <HollowButton text="Edit" handlePress={handleEdit} parentStyles={styles.buttonWidth}/>
            </View>
        </View>
        </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    circle :{
        backgroundColor : '#F0F2F2',
        width : 2000,
        height : 2000,
        borderRadius : 1000,
        alignItems : 'center',
        justifyContent : 'flex-start'
    },
    container : {
        backgroundColor :'white',
        flex : 1,
        alignItems : 'center',
        overflow :'hidden'
    },toptop : {
        flexDirection : 'row',
        width : Dimensions.get('window').width,
        justifyContent : 'space-between',
        paddingHorizontal : 13,
    },top : {
        backgroundColor : 'white',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingTop : 36,
        paddingBottom : 20,
        width : Dimensions.get('window').width
    },text : {
        color : '#0B3C58',
        textAlign : 'center',
      fontFamily : 'NewRubrik-Medium'

    },textTop :{
        fontSize : 22
    },textMid :{
        fontSize : 16,
        marginVertical : 13
    },textBot :{
        color : '#58798C',
        fontSize :12,
        textAlign : 'center',
      fontFamily : 'NewRubrik-Medium'

    },middle :{
        alignItems : 'center',
        marginTop : 60,
        paddingHorizontal : 16,
        width : '100%',
    },twoTextContainer : {
        backgroundColor : 'white',
        borderRadius : 8,
        width : Dimensions.get('window').width*0.9,
        padding : 18
    },bottom :{
        position : 'absolute',
        bottom : 1400,
        alignItems : 'center',
        width : "21%"
    },buttonWidth :{
        width : "80%",
        marginTop : '70%'
    }
})

export default EdtingRefuelingData