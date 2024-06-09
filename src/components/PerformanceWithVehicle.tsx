import React, { FC } from "react"
import RNPickerSelect from 'react-native-picker-select';
import { useEffect , useState } from "react";
import { View ,StyleSheet ,Text ,Image, Pressable} from "react-native";
import { useQuery , useRealm } from "@realm/react";
import { Vehicles } from "../Database/models/VehiclesSchema";
import useVehicleStore from "../state/Vehicles";
import AddRefuelingData from "./AddRefuelingData";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { Refueling } from "../Database/models/RefuelingSchema";
import useRefuelTriggerStore from "../state/RefuelTrigger";
import useVehicleArrayStore from "../state/VehiclesArray";
import Picker from "./Picker/Picker";
import { RefuelInterface, VehicleInterface } from "../Database/interfaces";
import { BSON } from "realm";

const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  
  interface pricedataInterface {
    month : string , 
    price : number
  }
  interface mileagedataInterface {
    month : number , 
    mileage : number | null
  }

  interface Props {
    navigation : any;
    userVehicles : VehicleInterface[]
  }

const PerformanceWithVehicle : FC<Props> = ({navigation ,userVehicles}) => {
    const {setRefuelState ,refuelDatas} = useRefuelTriggerStore();
    const { BSON, ObjectId } = require('bson');
    const realm = useRealm();
    const {vehId ,setVehicle , name} = useVehicleStore();
    const [priceChartData , setPriceChartData] = useState<pricedataInterface[] | null>(null)
    const [mileageChartData , setMileageChartData] = useState<mileagedataInterface[] | null>(null);
    const {VehiclesArray} = useVehicleArrayStore();
    const {image} = useVehicleStore();
    
    const getChartData = ()=>{
        const fiveMonthsAgo = new Date(new Date().getFullYear(), new Date().getMonth() - 4, 1);
        const curRefuelingData  = refuelDatas.filter((data)=> data.date >= fiveMonthsAgo)
        getPriceChartData(curRefuelingData);
        getMileageChartData(curRefuelingData)
    }


    const getPriceChartData = (curRefuelingData : RefuelInterface[])=>{
      let monthsArr =[0 , 0, 0 ,0 , 0 , 0, 0, 0 ,0 , 0 , 0 , 0]
      for(let i = 0;i<curRefuelingData.length ; i++){
          const month = curRefuelingData[i]?.date.getMonth() as NonNullable <number>;
          monthsArr[month] += curRefuelingData[i]?.price as NonNullable <number> ;
      }
      let arr : pricedataInterface[]  = [];
      const curMonth = new Date().getMonth();
      for(let i = 4;i>=0;i--){
          const month = (curMonth - i + 12)%12 ;
          const obj = {month : months[month] as NonNullable<string>, price : monthsArr[month] as NonNullable<number>}
          arr.push(obj);
      }
      setPriceChartData(arr);
    }

    const getMileageChartData = (curRefuelingData : RefuelInterface[])=>{
      let dist =[0 , 0, 0 ,0 , 0 , 0, 0, 0 ,0 , 0 , 0 , 0]
      let fuelCon = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
      for(let i = 0;i<curRefuelingData.length ; i++){
        
          const month = curRefuelingData[i]?.date.getMonth() as NonNullable<number>;
          const a = curRefuelingData[i]?.odometerEnd  as NonNullable<number>
          const b = curRefuelingData[i]?.odometerStart as NonNullable<number>
            dist[month] += (a  - b);
            fuelCon[month] += curRefuelingData[i]?.fuelConsumed as NonNullable<number>;

      }
      let arr = [];
      const fourMonthAgo = (new Date().getMonth() + 8 )%12 ;
      for(let i = 0;i<=4;i++){
          const month = (fourMonthAgo + i )%12 ;
          const f = fuelCon[month] as NonNullable<number>
          const obj = {month :  fourMonthAgo + i as NonNullable<number>, mileage : fuelCon[month] === 0 ? null : parseFloat((dist[month] as NonNullable<number>/f ).toFixed(2)) };
          if(i == 0 || i == 4 || obj.mileage != null)
            arr.push(obj);
      }
      setMileageChartData(arr);

    }

    useEffect(()=>{
        getChartData();
    }, [refuelDatas])

    const handleSelectChange = (value  : BSON.ObjectId )=>{
        const objectId = new ObjectId(value);
        const obj = realm.objects<VehicleInterface>('Vehicles').filtered('_id == $0' , objectId)[0] as NonNullable<VehicleInterface>;
        setVehicle({name : obj.name , type : obj.type , engine : obj.engine , userId : obj.userId , vehId : obj._id , image : obj.image});
        const curRefuelingData = realm.objects<RefuelInterface>('Refueling').filtered('vehId == $0' , value).sorted('date' , true);
        setRefuelState({curVehId : value , refuelDatas : [...curRefuelingData]});
    }

    const handlePressForAddFuel = ()=>{
        navigation.navigate('Refueling' , {screen : 'refuelingForm'}  )
    }

    const [open , setOpen] = useState(false);
  return (
    <Pressable onPress={()=>setOpen(false)} style={styles.container}>
        <Text style={styles.subHeading}>Choose the vehicle</Text>
       {VehiclesArray.length > 0 &&
       <Picker open={open} setOpen={setOpen} name={name} list={VehiclesArray} handleSelectChange={handleSelectChange} conStyles={170}/>
        }

        <Image style={styles.image} source={image.length > 300 ? { uri: `data:image/png;base64,${image}` } : {uri :image}}/>
        {
            refuelDatas.length > 0 ?(
            <View >
                {priceChartData && <BarChart priceChartData={priceChartData} />}
                <Text style={styles.chartHeading}>Vehicle mileage performance</Text>
                <View style={styles.chart}>
                {mileageChartData && <LineChart mileageChartData={mileageChartData}/>}
                </View>
            </View>
        ):  <AddRefuelingData handlePress={handlePressForAddFuel}/> 
        }
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container : {
        alignItems : 'center'
    },
    image :{
        width: 345 ,
        height: 165,
        marginTop : 20,
        borderColor : 'white',
        borderWidth : 6,
        borderRadius : 10
    },subHeading :{
        textAlign : 'center',
        fontSize : 16,
        color : '#0B3C58',
        fontFamily : 'NewRubrik-Medium'
    },chartHeading : {
        fontSize : 16,
        color : '#0B3C58',
        paddingLeft:15,
        marginTop : 30,
        fontFamily : 'NewRubrik-SemiBold'
    },chart : {
        backgroundColor : 'white',
        margin : 10,
        width :350,
        alignItems : 'center',
        borderRadius : 8
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginLeft : 109, 
        marginVertical : 10,
        textAlign : 'center',
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 170,
      paddingRight: 30, 
    },
    inputAndroid: {
        marginLeft : 109, 
       marginVertical : 10,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 170,
      textAlign : 'center',
      paddingRight: 30, 
    },
  });

export default PerformanceWithVehicle