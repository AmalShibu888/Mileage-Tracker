import React, { useEffect } from 'react'
import { View ,Text , StyleSheet , Image} from 'react-native'
import { useRealm } from '@realm/react';
import {  useState } from 'react'
import { Users } from '../Database/models/UsersSchema';
const logo = require('../rcs/logo.png')
import { FC } from 'react';
import { UserInterface } from '../Database/interfaces';
interface Props {
  navigation :any
}
const Splash2 : FC<Props> = ({navigation}) => {
    const realm = useRealm();
    const [activeUser , setActiveUser] = useState([]);
  useEffect(()=>{
    setTimeout(()=>{
        const activeUserCheck = realm.objects<UserInterface>('Users').filtered('active == $0' , true);
        if(activeUserCheck[0] == null)
            navigation.navigate('login');
        else if(activeUserCheck[0].passcode.length == 0)
            navigation.navigate('tabNavigation');
        else{
            navigation.navigate('checkPasscodeContainer' ,{user :activeUserCheck[0]})
        }
    } , 2000)
  } , [])



  return (
    <View style={styles.container}>
        <Image source={logo} />    
    </View>
  )
}



  
const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor:'#F55858',
        justifyContent: 'center',
        alignItems : 'center'
    }
})

export default Splash2