import React from 'react'
import { View ,Text ,StyleSheet ,TextInput ,Button , Pressable, KeyboardAvoidingView, Dimensions} from 'react-native'
import HeaderWithBackbutton from '../components/HeaderWithBackbutton'
import TextWith2Inputs from '../components/TextWith2Inputs';
import RNPickerSelect from 'react-native-picker-select';
import { Vehicles } from '../Database/models/VehiclesSchema';
import useUserStore from '../state/Users';
import useVehicleStore from '../state/Vehicles';
import { useQuery, useRealm } from '@realm/react'
import{ useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { Refueling } from '../Database/models/RefuelingSchema';
import { BSON } from 'realm';
import DoubleButton from '../components/Buttons/DoubleButton';
import useRefuelTriggerStore from '../state/RefuelTrigger';
import { FC } from 'react'
import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {  refuelingStackParamList } from '../types/Types'
import { RefuelInterface } from '../Database/interfaces';
import Calendar from '../rcs/calendar.svg'
interface Props {
  route: RouteProp<{ params: { info : RefuelInterface} }, 'params'>
  navigation : NativeStackNavigationProp<refuelingStackParamList ,'editingRefuelingForm' >
}

interface DataInterface {
    odometerStart :number ;
     odometerEnd : number;
    fuelConsumed : number;
     price : number;
}

const RefuelingForm : FC<Props> = ({navigation , route}) => {
    const realm = useRealm();
    const {id} = useUserStore();
    const {vehId} = useVehicleStore();
    const {info} = route.params;
    const {refuelDatas} = useRefuelTriggerStore();
    const [data , setData] = useState({  odometerStart :info.odometerStart , odometerEnd : info.odometerEnd , fuelConsumed : info.fuelConsumed , price : info.price});
    const [date , setDate] = useState(info.date)
    const [open, setOpen] = useState(false);
    const {editingRefuelData} = useRefuelTriggerStore();
    const [valueError , setValueErrors] = useState<boolean[]>([false , false , false , false]);
    const [errorText , setErrorText] = useState('');

    useFocusEffect(React.useCallback(()=>{
        if(data && valueError && data)
        validate(valueError , date , data);
    } , [valueError , date , data]))


    const handleData = (type : string , payload : Date)=>{
        if(type == 'date'){
            setDate(payload);
        }
    }


    function isStringConvertibleToFloat(str : string) {
        const floatRegex = /^\d*\.?\d*$/;
        
        return floatRegex.test(str) && !isNaN(parseFloat(str));
      }

      function isStringConvertibleToInteger(str : string) {
        const integerRegex = /^\d+$/;
        return integerRegex.test(str) && !isNaN(parseInt(str, 10));
      }

    const navigateToRefueling = ()=>{
        navigation.navigate('refuelingInfo');
    }

    const getOdometerData = (value : string[])=>{
        setData((curdata)=> {
            if(isStringConvertibleToInteger(value[0] as NonNullable<string>)){
                setValueErrors((errors) =>{
                    const newData = [...errors];
                    newData[0] = false;
                    return newData
                })
                return {...curdata , odometerStart : parseInt(value[0] as NonNullable<string>)}
            }
            
            setValueErrors((errors) =>{
                const newData = [...errors];
                newData[0] = true;
                return newData
            })

            return curdata;
        });
        setData((curdata)=> {
            if(isStringConvertibleToInteger(value[1] as NonNullable<string>)){
                setValueErrors((errors) =>{
                    const newData = [...errors];
                    newData[1] = false;
                    return newData
                })
                return {...curdata , odometerEnd : parseInt(value[1] as NonNullable<string>)}
            }
            setValueErrors((errors) =>{
                const newData = [...errors];
                newData[1] = true;
                return newData
            })
            return curdata
        });
    }

    const getFuelData = (value : string[])=>{
        setData((curdate)=>{
            if(isStringConvertibleToFloat(value[0] as NonNullable<string>)){
                setValueErrors((errors) =>{
                    const newData = [...errors];
                    newData[2] = false;
                    return newData
                })
            return {...curdate , fuelConsumed : parseFloat(value[0] as NonNullable<string>)}
            }
            setValueErrors((errors) =>{
                const newData = [...errors];
                newData[2] = true;
                return newData
            })
            return curdate

        });
        setData((curdate)=>{
            if(isStringConvertibleToFloat(value[1] as NonNullable<string>)){
                setValueErrors((errors) =>{
                    const newData = [...errors];
                    newData[3] = false;
                    return newData
                })
                return {...curdate , price : parseFloat(value[1] as NonNullable<string>)}

            }
            setValueErrors((errors) =>{
                const newData = [...errors];
                newData[3] = true;
                return newData
            })
            return curdate
        });
    }

    const handleSubmit = ()=>{
        const newDate = new Date();
        editingRefuelData({...info , ...data , curDate : newDate , date : date})
        const toUpdate = realm.objects<RefuelInterface>('Refueling').filtered('_id == $0' , info._id)[0];
        if(toUpdate)
            realm.write(()=>{
                toUpdate.date = date,
                toUpdate.odometerStart = data.odometerStart
                toUpdate.odometerEnd = data.odometerEnd
                toUpdate.price = data.price
                toUpdate.fuelConsumed = data.fuelConsumed
                toUpdate.curDate = new Date();
            })

        navigation.navigate('refuelingInfo');
    }
    const ignoreTimedate = (date : Date)=>{
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    const CheckDate = (theDate : Date , odometerStart : number, odometerEnd : number)=>{
        const today = new Date();
        const theDateIgnoreTime =  ignoreTimedate(theDate);
        if(refuelDatas.length == 0)
            return theDate <= today;
        const sortedRefuelData = refuelDatas.sort((a ,b)=>{
            const c = new Date(a.date.getFullYear(), a.date.getMonth(), a.date.getDate());
            const d = new Date(b.date.getFullYear(), b.date.getMonth(), b.date.getDate());

            if(c < d)
                return -1
            else if(c> d)
                return 1;

            if(a.odometerStart < b.odometerStart)
                return -1;
            
            return 1;
        }
        );
        let i = 0 ;
        while(i<sortedRefuelData.length && sortedRefuelData[i]?.odometerStart as NonNullable<number> < odometerStart){
            i++;
        }
        let res = theDate <= today;
        if(i != 0 ){
            const a = sortedRefuelData[i - 1]?.odometerEnd as NonNullable<number>
            res = res && (ignoreTimedate(sortedRefuelData[i - 1]?.date as NonNullable<Date>)  <= theDateIgnoreTime && odometerStart >= a);
        }

        if(i < sortedRefuelData.length - 1){
            const a = sortedRefuelData[i + 1]?.odometerStart as NonNullable<number>
            res = res && (ignoreTimedate(sortedRefuelData[i + 1]?.date as NonNullable<Date>)  >= theDateIgnoreTime && theDateIgnoreTime && odometerEnd <= a);
        }

        return res;
        
    }

    const validate = (valError : boolean[] , daate : Date , daata : DataInterface)=>{
        if(!daate || daata.odometerStart < 0 || daata.odometerEnd < 0 || daata.price < 0 || daata.fuelConsumed < 0){
            setErrorText('One or more input field is empty');
            return true;
        }
        else if(valError[0] || valError[1] || valError[2] || valError[3]){
            setErrorText('invalid value Entered');
            return true;
        }else if(daata.odometerStart < 0 || daata.odometerEnd < 0 || daata.odometerStart >= daata.odometerEnd){
            setErrorText('Starting odometer value cannot be greater than or eqaul to ending odometer value');
            return true;
        }
        else if(!CheckDate(daate , daata.odometerStart , daata.odometerEnd)){
            setErrorText('invalid odometer data');
            return true;
        }
        setErrorText('');
        return false;

    }



  return (

    <KeyboardAvoidingView style={styles.container}>
        <View style={styles.top}>
            <HeaderWithBackbutton handlePress={navigateToRefueling}/>
            <Text style={styles.heading}>Edit Refuelling Record</Text>
        </View>
        

        <View style={styles.middle}>
            <Pressable onPress={()=>setOpen(true)} style={styles.input}>
            <View>
                    <Text style={styles.dateText}>Refueling Date</Text>
                    <Text style={styles.text}>{date ? moment(date).format('DD/MM/YYYY') : 'Refueling Date'}</Text>
                </View>
                <Calendar />
            </Pressable>
            <DatePicker
                modal
                open={open}
                date={date}
                mode='date'
                onConfirm={(date) => {
                    setOpen(false)
                    handleData('date' , date);
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <TextWith2Inputs values={[data.odometerStart , data.odometerEnd]} getData={getOdometerData} heading = "Odometer" inp1='Start reading'  inp2 ='End reading'/>
            <TextWith2Inputs values={[data.fuelConsumed , data.price]} getData={getFuelData} heading = "Fuel" inp1='Consumed (in L)'  inp2 ='Price (in S$)'/>
            <Text style={styles.error}>{errorText}</Text>

        </View>

        <View style={styles.bottom}>
        <DoubleButton textHollow ="Cancel" handlehollowPress={()=>navigation.goBack()} handleSolidPress={handleSubmit}
              solidDisabled = {errorText.length !== 0}
            textSolid='Edit'
          />

        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center'
    },top:{
        flex : 0.2,
        width : '100%'
    },
    heading : {
        textAlign:'center',
        fontSize : 22,
        color : 'black',
      fontFamily : 'NewRubrik-Medium'

    },middle :{
        alignItems : 'center',
        flex : 0.75
    },input : {
        width : Dimensions.get('window').width*0.9,
        backgroundColor: 'white',
        padding : 10,
        borderRadius : 4,
        marginVertical : 25,
      fontFamily : 'NewRubrik-Medium',
      flexDirection :'row',
        justifyContent : 'space-between',
        alignItems : 'center'

    },
    bottom :{
        position : 'absolute',
        bottom : 40,
        flexDirection : 'row',
        alignItems : 'center',
    },dateText : {
        color : '#6D8A9B',
        fontSize : 11
    },text : {
        fontFamily : 'NewRubrik-Medium',
        fontSize : 15
  
    },error :{
        color : 'crimson'
    }
})


export default RefuelingForm