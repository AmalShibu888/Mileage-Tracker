import {  useRealm } from '@realm/react'
import React, { useEffect, useState } from 'react'
import { View ,Image, StyleSheet,Text  ,SafeAreaView , ScrollView, Pressable, Dimensions } from 'react-native'  
import useUserStore from '../state/Users';
import { Vehicles } from '../Database/models/VehiclesSchema';
import HomePageNoVehicles from '../components/HomePageNoVehicles';
import HomePageWithVehicles from '../components/HomePageWithVehicles';
import LinearGradient from 'react-native-linear-gradient';
import { Users } from '../Database/models/UsersSchema';
import useVehicleArrayStore from '../state/VehiclesArray';
import useVehicleStore from '../state/Vehicles';
import { FC } from 'react';
import { UserInterface, VehicleInterface } from '../Database/interfaces';
import AddRefuelingData from '../components/AddRefuelingData';
import HomePageWithRefuelingData from '../components/HomePageWithRefuelingData';
import useRefuelTriggerStore from '../state/RefuelTrigger';
import Picker from '../components/Picker/Picker';;
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabParamList, StackParamList } from '../types/Types'
import { RefuelInterface } from '../Database/interfaces';
import { BSON } from 'realm';

interface pricedataInterface {
  month : string , 
  price : number
}


const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
interface Props{
  navigation : any
}

const ProfilePageWithVehicle : FC<Props> = ({navigation}) => {
    const {name, nickname } = useUserStore();
    const {VehiclesArray} = useVehicleArrayStore();
    const {setVehicle  ,image ,vehId , name : vehName }  = useVehicleStore();
    const [mileage , setMileage] = useState<number | null>(null);
    const [avMileage , setAvMileage] = useState<number | null>(null);
    const [ priceChartData , setPriceChartData] = useState<pricedataInterface[]>([]);
    const realm = useRealm();
    const {curVehId , setRefuelState , refuelDatas}  = useRefuelTriggerStore();

      useEffect(()=>{
        getRefuelingDataOfVeh();
      } , [])

      useEffect(()=>{
        getChartData();
      } , [vehId , refuelDatas])

      const getChartData = ()=>{
            const fiveMonthsAgo : Date = new Date(new Date().getFullYear(), new Date().getMonth() - 4, 1);
            const curRefuelingData = refuelDatas.filter((data)=> data.date >= fiveMonthsAgo)
            getMileage();
            getPriceChartData([...curRefuelingData]);
      }
      
      const getRefuelingDataOfVeh = ()=>{
            const curRefuelingData = realm.objects<RefuelInterface>('Refueling').filtered('vehId == $0' , vehId).sorted('date' , true);
            setRefuelState({curVehId : vehId , refuelDatas : [...curRefuelingData]});
        if(vehId){
            const fiveMonthsAgo = new Date(new Date().getFullYear(), new Date().getMonth() - 4, 1);
            const curRefuelingData = realm.objects<RefuelInterface>('Refueling').filtered('vehId == $0 AND date >= $1' ,vehId , fiveMonthsAgo).sorted('date' ,true);
            getMileage();
            getPriceChartData([...curRefuelingData]);
        }
      }
  
      const getPriceChartData = (curRefuelingData : RefuelInterface[])=>{
        let monthsArr =[0 , 0, 0 ,0 , 0 , 0, 0, 0 ,0 , 0 , 0 , 0];
        for(let i = 0;i<curRefuelingData.length ; i++){
            const month = curRefuelingData[i]?.date.getMonth() as NonNullable<number>;
              monthsArr[month] += curRefuelingData[i]?.price as NonNullable<number>;
        }
        let arr : pricedataInterface[] = [];
        const curMonth = new Date().getMonth();
        for(let i = 4;i>=0;i--){
            const month = (curMonth - i + 12)%12 ;
            const obj  : pricedataInterface = {month : months[month] as NonNullable<typeof months[number]>, price : monthsArr[month] as NonNullable<typeof monthsArr[number]>}
            arr.push(obj);
        }

        setPriceChartData(arr);
      }
  
      const getMileage = ()=>{
        const totalRef = realm.objects<RefuelInterface>('Refueling').filtered('vehId == $0' , vehId).sorted('date');
        if(totalRef.length > 0){
          let res  = 0;
          totalRef.map((data)=>{
              res += (data.odometerEnd - data.odometerStart)/data.fuelConsumed;
          })

          setAvMileage(parseFloat((res/totalRef.length).toFixed(2)));
          const obj  = totalRef[totalRef.length - 1];
          if(obj)
            setMileage(parseFloat(((obj.odometerEnd - obj.odometerStart )/obj.fuelConsumed).toFixed(2)));
        }
  
      }

    
    const handleSelectChange =  (value : BSON.ObjectId )=>{
        let obj : VehicleInterface = {name : '' ,userId : new BSON.ObjectID , engine : '0' ,type : 0 , image : '' , _id : new BSON.ObjectID };
        VehiclesArray.map((vehicleData) => {
            
            if(vehicleData._id.equals(value) ){
                obj= {...vehicleData};
            }
        });

        setVehicle({name : obj.name , engine : obj.engine , vehId : obj._id , userId : obj.userId , type : obj.type , image : obj.image});
        const curRefuelingData = realm.objects<RefuelInterface>('Refueling').filtered('vehId == $0' , value).sorted('date' , true);
  
        setRefuelState({curVehId : value , refuelDatas : [...curRefuelingData]});
    }

    const handlePressForAddFuel = ()=>{
        navigation.navigate('Refueling' , {screen : 'refuelingForm'}  )
    }
    const [open , setOpen] = useState(false);
  return (
    <Pressable onPress={()=>setOpen(false)} style={{flex : 1}}>
    <ScrollView style={styles.container}>
        <View style={styles.gradientContainer}>

            <LinearGradient style={{flex : 0.8, zIndex : 1}}   colors={['#C5E3DC', '#F6F6EC']} >
            <SafeAreaView style={{flex : 1}}>
                <View style={styles.bb}>
            <Pressable style={styles.logo} onPress={() =>navigation.openDrawer()}>
                        <Image source={require('../rcs/dummyProfile.png')}/>
                    </Pressable>
                <View style={styles.header}>
                    
                    <Image style={styles.image2} source={require('../rcs/logo2.png')}/>
                </View>
                <View style={styles.medium}>
                    <Text style={styles.greeting}>Hi {nickname || name}</Text>
                    
                </View>
                <View >
                    <Text style={styles.welcome}>Here is everything about your</Text>
                    
                    
                </View>
                </View>
            </SafeAreaView>
            </LinearGradient>
            
                    <View style={styles.picker}>
                    {
                    VehiclesArray.length > 0 &&
                    <Picker name={vehName} list={VehiclesArray} handleSelectChange={handleSelectChange} open={open} setOpen={setOpen} conStyles={Dimensions.get('window').width * 0.4}/>
                    }
                    </View>
                <View style={styles.imageContainer}>
                        {
                            image &&
                        <Image style={styles.image} source={image.length > 300 ? { uri: `data:image/png;base64,${image}` } : {uri :image}}/>
                        }
                </View>
            </View>
            <SafeAreaView>     
        <View style={styles.bottomContainer}>
                {priceChartData.length > 0 && mileage && avMileage && refuelDatas.length > 0  ?
                        <HomePageWithRefuelingData navigation={navigation} priceChartData={[...priceChartData]} mileage={mileage} avMileage={avMileage}/>:
                        <AddRefuelingData handlePress={handlePressForAddFuel} />
                    }
        </View>
        </SafeAreaView>
     </ScrollView>
      </Pressable>
        
  )
}
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: '#E4EBEF',
        zIndex : 1,
 
    },logo :{
        position : 'absolute',   
        top : '20%',
        left : '3%',
        zIndex : 1

    },
    header : {
        marginTop : '6%',
        alignItems : 'center'
    },image2 : {

    },greeting : {
        color : "crimson",
        fontSize : 30,
        fontFamily : 'NewRubrik-Medium'

    },medium :{
        alignItems : 'center',
        padding : '2%',
    },bottomContainer : {

        backgroundColor : '#E4EBEF',

      },
        imageContainer :{
            alignItems : 'center',
            position : 'absolute',
            bottom : 0,
            zIndex : 1,
            width: "100%" ,
            height: '38%',
        },
        welcome : {
            fontSize : 18,
            textAlign : 'center',
            fontFamily : 'NewRubrik-Medium'
        },image :{
            width: "90%" ,
            height: '100%',
            marginTop : '2%',
            borderColor : "white",
            borderWidth : 8,
            borderRadius : 8,
            position : 'absolute',
            bottom : 0,
            zIndex : 1
            
        },loadingContainer :{
          marginTop : 100,
        },conStyles :{
          width : 170
        },gradientContainer :{
            height : height * 0.56,
        },picker :{
            zIndex : 5,
            position : 'absolute',
            width: "100%",
            top : "39%"
        }, bb : {
        }
})

export default ProfilePageWithVehicle