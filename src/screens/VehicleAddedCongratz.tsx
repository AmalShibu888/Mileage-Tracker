import React, { useEffect } from 'react'
import { Image, StyleSheet , View , Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { FC } from 'react';

interface Props {
    route : any
    navigation :any
}

const VehicleAddedCongratz : FC<Props> = ({route , navigation}) => {
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('vehiclesInfo');
        } , 2000)
    },[])
    const {image , name } = route.params
  return (
    <LinearGradient style={styles.container}  colors={['#C5E3DC', '#F6F6EC']} >
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={image.length > 300 ? { uri: `data:image/png;base64,${image}` } : {uri :image}}/>
            <Image style={styles.congratzImage} source={require('../rcs/contratz.png')}/>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.nametext}>{name}</Text>
            <Text style={styles.vehadded}>Vehicle Added!</Text>
        </View>
        <Image style={styles.bottomImage} source={require('../rcs/vehicleCongratz.png')} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        alignItems : 'center'
    },congratzImage :{
        
    },image :{
        width : 120,
        height : 120,
        borderRadius : 60,
        zIndex : 2,
        position : 'absolute',
        marginTop : 90
    },imageContainer :{
        alignItems : 'center',
        marginTop : 60
    },nametext :{
        fontSize : 22,
        color : '#0B3C58',
        textAlign:'center',
      fontFamily : 'NewRubrik-Medium'

    },textContainer :{
        marginTop : 20
    },vehadded :{
        fontSize : 36,
        color : '#0B3C58',
        textAlign : 'center',
        marginTop : 20,
      fontFamily : 'NewRubrik-Medium'

    },bottomImage :{
        position : 'absolute',
        bottom : 0,
        width : '100%'
    }
})

export default VehicleAddedCongratz