import React, { useEffect } from 'react'
import { View ,Text , Image, StyleSheet} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import AddRefuelingData from './AddRefuelingData';
import { useState } from 'react';
import { useQuery, useRealm } from '@realm/react';
import { Vehicles } from '../Database/models/VehiclesSchema';
import useVehicleStore from '../state/Vehicles';
import HomePageWithRefuelingData from './HomePageWithRefuelingData';
import useRefuelTriggerStore from '../state/RefuelTrigger';
import useVehicleArrayStore from '../state/VehiclesArray';
import Picker from './Picker/Picker';
import { FC } from 'react';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabParamList, StackParamList } from '../types/Types'
import { RefuelInterface, VehicleInterface } from '../Database/interfaces';
import { BSON } from 'realm';

interface Props {

    navigation : NativeStackNavigationProp<BottomTabParamList, 'Home' >,
}
interface pricedataInterface {
  month : string , 
  price : number
}
const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
const HomePageWithVehicles : FC<Props> = ({ navigation }) => {
    const {setVehicle  ,image ,vehId , name }  = useVehicleStore();
    const [mileage , setMileage] = useState<number | null>(null);
    const [avMileage , setAvMileage] = useState<number | null>(null);
    const [ priceChartData , setPriceChartData] = useState<pricedataInterface[]>([]);
    const realm = useRealm();
    const {VehiclesArray} = useVehicleArrayStore();
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
   
  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>Here is everything about your</Text>
        {
          VehiclesArray.length > 0 &&
          <Picker name={name} list={VehiclesArray} handleSelectChange={handleSelectChange} conStyles={170}/>
        }
        <View style={styles.imageContainer}>
          {
            image &&
        <Image style={styles.image} source={image.length > 300 ? { uri: `data:image/png;base64,${image}` } : {uri :image}}/>
          }
        </View>
        {priceChartData.length > 0 && mileage && avMileage && refuelDatas.length > 0  ?
            <HomePageWithRefuelingData navigation={navigation} priceChartData={[...priceChartData]} mileage={mileage} avMileage={avMileage}/>:
            <AddRefuelingData handlePress={handlePressForAddFuel} />
        }
    </View>
  )
}



export default HomePageWithVehicles