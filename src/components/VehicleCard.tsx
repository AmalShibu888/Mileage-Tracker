import React, { FC, useState } from 'react'
import { View , Image, Text, StyleSheet } from 'react-native'
import { VehicleInterface } from '../Database/interfaces'


interface Props {
  data : VehicleInterface;
}

const VehicleCard : FC<Props>= ({data}) => {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={data.image.length > 300 ? { uri: `data:image/png;base64,${data.image}` } : {uri :data.image}}/>
        <View style={styles.textContainer}>
            <View style={styles.leftText}>
                <Text numberOfLines={1} style={styles.leftTopText}>{data.name}</Text>
                <Text style ={styles.leftBottomText}>{data.type} wheeler</Text>
            </View>
            <View style={styles.rightText}>
                <Text style={styles.engine}>{data.engine} CC</Text>
            </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container :{
      elevation : 8,
      backgroundColor : "white",
      borderRadius : 10,
      margin : 12,
      alignItems : 'center',
      width : "90%",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 10
    },textContainer : {
      width : '100%',
      flexDirection : 'row',
      justifyContent : 'space-between',
      alignItems : 'center'
    },leftText : {
        width :   '50%',
        paddingHorizontal : 16,
        paddingVertical : 5
    },leftTopText : {
        color : '#0B3C58',
        fontSize : 16,
        marginBottom : 5,
        fontFamily : 'NewRubrik-Medium'


    },leftBottomText :{
      color : '#58798C',
      fontFamily : 'NewRubrik-Medium'

    },rightText :{
      paddingHorizontal : 16,
        paddingVertical : 5,
        color : '#0B3C58'
    },
    image : {
      width: "100%" ,
       height: 148,
       borderTopLeftRadius : 10,
       borderTopRightRadius : 10
    
    },engine : {
      fontFamily : 'NewRubrik-Medium'

    }
})

export default VehicleCard