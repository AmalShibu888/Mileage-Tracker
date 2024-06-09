import React from 'react'
import { StyleSheet ,Image ,Text , View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FC } from 'react';

interface Props {
  handlePress :()=>void,
  text : string,
  image : number
}

const DrawerButton : FC<Props> = ({image , text , handlePress}) => {
  return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <View style={styles.top}>
                <Image source={image} />
                <Text style={styles.text}>{text}</Text>
            </View>
            <Text> {'>'}</Text>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container :{
    },button : {
        flexDirection : 'row',
        alignItems :'center',
        padding :15,
        justifyContent : 'space-between'
    },text : {
        fontSize : 16,
        color :'#0B3C58',
        marginLeft : 20,
        fontFamily : 'NewRubrik-Medium'
    },arrow :{
        fontSize :16 ,
        color : '#0B3C58',
        fontWeight :'bold'
    },top : {
        flexDirection : 'row',
        alignItems : 'center'

    }
})

export default DrawerButton