import React, { useEffect } from 'react'
import { View  , StyleSheet, Text , Button, TouchableOpacity, KeyboardAvoidingView, SafeAreaView  } from 'react-native'
import {useState} from 'react'
import PasscodeEntry from '../components/PasscodeEntry'
import BackButton from '../components/BackButton'
import PasscodeEntry1 from '../components/PasscodeEntry1'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {useRealm , useQuery} from '@realm/react';
import {Users} from '../Database/models/UsersSchema';
import useUserStore from '../state/Users'
import { BSON } from 'realm'
import CommonButton from '../components/Buttons/CommonButton'
import useVehicleArrayStore from '../state/VehiclesArray'
import { Vehicles } from '../Database/models/VehiclesSchema'
const colors = ['#FF5733', '#5733FF','#33A1FF',  '#FF33A1', '#FF3361', '#3361FF'];

import { FC } from 'react'

interface Props {
    navigation : any
}

const SetPasscode : FC<Props> = ({navigation}) => {

    const {setPasscode ,passcode ,name , nickname , email,setId , id} = useUserStore();
    const realm = useRealm();

    const AddUserToRealm = (ind : number)=>{
        const id = new BSON.ObjectId()
        realm.write(() => {
            realm.create('Users', {
                _id: id,
                name,
                nickname,
                email,
                passcode : ind == 0 ? firstData : '',
                active : true,
                color : colors[Math.floor(Math.random() * 6)]
            });
          });
          setId(id);

    }



    const handleSubmit =  ()=>{
        setPasscode(firstData);
        AddUserToRealm(0);
        navigation.navigate('tabNavigation')

    }
    
    const handleSkip = ()=>{
        AddUserToRealm(1);
        navigation.navigate('tabNavigation')

    }

    const [isSecondInputCompleted , setIsSecondInputCompleted] = useState(false);
    const [firstData , setFirstData]  = useState('');
    const [secondData , setSecondData]  = useState('');
    const [focusOnFirst , setFocusOnFirst] = useState(true);
    const [focusonSecond , setFocusOnSeccond] = useState(false);
    const [error , setError] = useState(true);
    const getFirstData = (data : string)=>{
        setFirstData(data);
        if(isSecondInputCompleted)
            validate(data, secondData);
    }
    const getSecondData = (data : string)=>{
        setSecondData(data);
        if(data.length == 4){
            setIsSecondInputCompleted(true);
            validate(firstData, data);
        }
        if(isSecondInputCompleted)
            validate(firstData, data);
        
            


    }
    const validate = (d1 :string, d2 : string) =>{
        setError(!(d1 === d2));
    }
  return (
    <LinearGradient style={{flex : 1}}  colors={['#C5E3DC', '#F6F6EC']} >
    <KeyboardAvoidingView style={styles.container}>
    <SafeAreaView style={{flex : 1}}>
        <View style={styles.top}>
            <BackButton navigation={navigation} style={styles.image}/>
            <View style={styles.body}>
                <Text style={styles.heading}>
                    Set a Passcode
                </Text>
                <PasscodeEntry1 isfocused={focusOnFirst} getData={getFirstData} heading='Enter a 4-Digit Passcode' subtitle='You will need to enter at every app launch' />
                <PasscodeEntry1 isfocused={focusonSecond} getData={getSecondData} heading='Confirm Password' subtitle='' />

            </View>
            { error && <Text style={styles.error}>The passcodes don't match</Text>}
        </View>
        <View >
            <CommonButton text="continue" disabled={error} handlePress={handleSubmit} />
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    </KeyboardAvoidingView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        paddingVertical : 10,
        paddingHorizontal : 20
    },top : {
        flex : 1
    },image :{
    },body : {
        marginTop : 50
    },heading : {
        fontSize : 25,
        color : 'black',
        marginBottom : 30,
      fontFamily : 'NewRubrik-SemiBold'

    },b1 : {
        marginBottom : 10
    },error : {
        color : 'crimson',
        textAlign :'center',
      fontFamily : 'NewRubrik-Medium'

    },skipButton : {
        paddingVertical : 16,
        paddingHorizontal : 20,
        borderRadius : 8
    },skipButtonText :{
        color :'#0B3C58',
        textAlign : 'center',
        fontFamily : 'NewRubrik-SemiBold'

    }
})

export default SetPasscode