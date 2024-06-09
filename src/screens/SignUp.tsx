import React from 'react'
import { StyleSheet, View , Text , Image , Button, SafeAreaView} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import CommonButton from '../components/Buttons/CommonButton';
import { FC } from 'react';
import { NavigationProp } from '@react-navigation/native';

interface Props {
    navigation: NavigationProp<any>;
}
const SignUp : FC<Props> = ({navigation}) => {
  return (
    <LinearGradient style={{flex : 1}}  colors={['#C5E3DC', '#F6F6EC']} >
        <SafeAreaView style={{flex : 1}}>
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../rcs/logo.png')} />
            <Text style={styles.text1}>Mileage Tracker</Text>
            <Text style={styles.text2}>Create an Account to get Started</Text>
            <CommonButton disabled={false} parentStyles={styles.button} text="Sign Up" handlePress={()=>navigation.navigate('createAccount')}/>
        </View>
        <Text style={styles.bot}>
        Track your miles towards a prosperous financial journey!
        </Text>
        <View>
            <Image style={styles.bottomImage} source={require('../rcs/signupFooter.png')}/>
        </View>
    </View>
    </SafeAreaView>
    </LinearGradient>
    
  )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        
    },
    header :{
        marginTop : 50,
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1
    },
    button : {
        width : '70%',
        marginTop : 30
    },
    text1 :{
        color : '#FF4E4E',
        fontSize : 20,
      fontFamily : 'NewRubrik-Medium'

    },
    text2 :{
        marginTop : 20,
        fontSize : 20,
      fontFamily : 'NewRubrik-Medium'

    },bot :{
        position : 'absolute',
        fontSize : 22,
        bottom : 50,
        zIndex : 1,
        color : '#0B3C58',
        textAlign : 'center',
        padding : 10,
        width : '100%',
      fontFamily : 'NewRubrik-Medium'

    },bottomImage :{
        width : '100%'
    }

})

export default SignUp