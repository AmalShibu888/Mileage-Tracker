import React from 'react'
import { StyleSheet, View  , Text , Pressable} from 'react-native'
import WhiteBox from './WhiteBox'
import BarChart from './BarChart'
import { Refueling } from '../Database/models/RefuelingSchema'
import RefuelingCard from './RefuelingCard'
import { FC } from 'react';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabParamList, StackParamList } from '../types/Types'
import { CompositeScreenProps } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { RefuelInterface } from '../Database/interfaces'
import useRefuelTriggerStore from '../state/RefuelTrigger'



interface pricedataInterface {
    month : string , 
    price : number
  }
  interface refuelingdataInterface {
    month : string , 
    mileage : number
  }
interface Props {
    priceChartData : pricedataInterface[];
    mileage : number;
    avMileage : number;
    navigation : NativeStackNavigationProp<BottomTabParamList, 'Home' >,
}

const HomePageWithRefuelingData : FC<Props> = ({priceChartData , mileage , avMileage  , navigation }) => {
    const navigateToRefuleingInfo = ()=>{
        navigation.navigate('Refueling' , {screen : 'refuelingInfo'});
      }
      const {refuelDatas} = useRefuelTriggerStore();
  return (
    <View style={styles.container}>
        <Text style={styles.subHeading}>Fuel insights</Text>
        <View style={styles.whiteBoxContainer}>
            <WhiteBox text="Avg Fuel Consumption" value={`${avMileage} Km/l`}/>
            <WhiteBox text="Last Fuel Consumption" value={`${mileage} Km/l`}/>
            
            
        </View>
        <BarChart priceChartData={priceChartData} />

        <View style={styles.refuelingTextContainer}>
            <Text style={styles.subHeading}>Refuelling history</Text>
            <Pressable  onPress={navigateToRefuleingInfo} style={styles.seeAllContainer}>
            <Text style={styles.seeAll}>See all {'>'}</Text>
            </Pressable>
        </View>
        <View style={styles.refuelingContainer}>
        {
            refuelDatas.sort((a,b)=>a.date > b.date ? -1 : 1).slice(0 , 5).map((data , index)=>(
                <RefuelingCard ind={0} navigation={navigation} data={data._id} key={index}/>
            ))
        }
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container :{
        marginTop : 40,
    },
    subHeading : {
        color : '#0B3C58',
        fontSize : 16,
        fontWeight : 'bold',
        marginBottom : 10,
        paddingLeft : 15,
        fontFamily : 'NewRubrik-SemiBold'
    },whiteBoxContainer :{
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal: 20,
        paddingVertical :16,
        backgroundColor :'#F0F2F2'
    },refuelingTextContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingRight : 15,
        marginTop : 40
    },seeAll :{
        color : '#B84646',
        fontSize : 14,
        fontFamily : 'NewRubrik-Medium'
    },refuelingContainer : {
        marginBottom : 20
    },seeAllContainer : {
        justifyContent : 'center'
    }
})

export default HomePageWithRefuelingData