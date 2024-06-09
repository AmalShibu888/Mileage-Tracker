import React, { useState } from 'react'
import { View  ,StyleSheet , Text , Button , Image , Pressable, KeyboardAvoidingView, SafeAreaView} from 'react-native'
import InputWithText from '../components/InputWithText'
import BackButton from '../components/BackButton'
import CheckBox from '../components/CheckBox'
import LinearGradient from 'react-native-linear-gradient';
import {useRealm , useQuery} from '@realm/react';
import {Users} from '../Database/models/UsersSchema';
import useUserStore from '../state/Users'
import CommonButton from '../components/Buttons/CommonButton'
import { FC } from 'react'
import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '../types/Types'
interface Props {
  route: any
  navigation : any
}


const CreateAccounts : FC<Props> = ({navigation , route}) => {
    const loc  = route?.params?.loc ;
    const {name , nickname , email , setUser} = useUserStore();
    const realm = useRealm();
    const [checked , setChecked] = useState<boolean>(false);
    const [data , setData]  = useState<string[]>(['' , '' , '']);
    const [error1 , setError1] = useState(true);
    const [error2 , setError2] = useState(false);
    const [error3 , setError3] = useState(true);
    useFocusEffect(React.useCallback(()=>{
     setError1(true);
     setError2(false);
     setError3(true);
    setChecked(false);

    } , []))
    const handleSubmit = ()=>{
        if(data[0] && data[1] && data[2])
            setUser({name : data[0] , nickname : data[1] , email : data[2]});
        setChecked(false);
        setData(['' , '' ,'']);
        navigation.navigate('setPasscode')

    }
    const handleInputs =  (index  : number, changedData : string)=>{
        setData((state)=>{
            const newState = [...state];
            newState[index] = changedData;
            return newState;
        });
    }

    const nameCheck = (name : string) =>{
        const regex = /[0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
        return !regex.test(name);
    }


    function isValidGmail(email : string) {
        const gmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isEmailValid = gmailRegex.test(email);
        if(isEmailValid){
            const existingUser = realm.objects(Users).filtered('email == $0' , data[2]);
            return existingUser.length === 0;
        }
        return false;
      }

      const handleError = (index : number ,err : boolean)=>{
            if(index == 0)
                setError1(err);
            else if(index == 1)
                setError2(err);
            else
                setError3(err);
      }
  return (
    <LinearGradient style={{flex : 1}}  colors={['#C5E3DC', '#F6F6EC']} >
        <SafeAreaView style={{flex : 1}}>
    <KeyboardAvoidingView style={styles.container}>
        

        <View style = {styles.top}>
            <BackButton style={styles.image} navigation={navigation} handlePress={loc ? ()=>navigation.navigate(loc) : ()=>navigation.goBack()}/>
            <Text style={styles.heading}>Create Account</Text>
            <View style={styles.inputscontainer}>
                <InputWithText value={data[0] as NonNullable<string>}  handleError={handleError} text='Name' required={true} handleInputs={handleInputs} id={0} errorText='you cannot include Symbols or Numbers' validationFun={nameCheck}/>
                <InputWithText value={data[1] as NonNullable<string>} handleError={handleError} text='Nickname' required={false} handleInputs={handleInputs} id={1} errorText='you cannot include Symbols or Numbers' validationFun={nameCheck}/>
                <InputWithText value={data[2] as NonNullable<string>} handleError={handleError} text='Email Address' required={true} handleInputs={handleInputs} id={2} errorText='Invalid email' validationFun={isValidGmail}/>
            </View>
        </View>
        <View style={styles.bottom}>
            <View style={styles.cBoxContainer}>
                <CheckBox setChecked={setChecked}/>
                <Text style={styles.text}>Tick this box to confirm that you are at least 18 years old and agree to our<Text style={checked ? styles.TandC : styles.text}> Terms & conditions</Text></Text>
            </View>
            <CommonButton parentStyles={styles.button} handlePress={handleSubmit} text="Continue" disabled={ !checked || error1 || error3 || error2}/>
            

        </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        flexDirection:'column',
        justifyContent : 'space-between'
    },inputscontainer : {
        marginTop : 32
    },image :{
        marginBottom : 50
    },
    top :{
        marginLeft : "3%",
        marginTop : 20,
        height : "75%"
    },
    heading :{
        fontSize : 22,
        color : '#0B3C58',
      fontFamily : 'NewRubrik-Medium'

        
    },
    bottom : {
        backgroundColor : 'white',
        alignItems : 'center',
        paddingHorizontal : '2%',
        paddingVertical : 10
    },
    cBoxContainer : {
        marginVertical : 10,
        marginLeft : 1,
        flexDirection : 'row',
        paddingHorizontal : 20,
        alignItems : 'flex-start',
    },TandC : {
        color : "#B84646",
      fontFamily : 'NewRubrik-Medium'

    },button : {
        width : "80%"
    },text : {
      fontFamily : 'NewRubrik-Medium',
        color : 'black'
    }


})

export default CreateAccounts