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
import useVehicleArrayStore from '../state/VehiclesArray';
import Picker from '../components/Picker/Picker';
import { FC } from 'react';
import { RefuelInterface, UserInterface, VehicleInterface } from '../Database/interfaces';
import { useFocusEffect } from '@react-navigation/native';
import Calendar from '../rcs/calendar.svg'
import PickerRefuelingForm from '../components/Picker/PickerRefuelingForm';

interface DataInterface {
    odometerStart :number ;
     odometerEnd : number;
    fuelConsumed : number;
     price : number;
     vehId : BSON.ObjectId
}

interface Props{
  navigation : any
}
const RefuelingForm : FC<Props> = ({navigation }) => {
    const {addRefuelData ,refuelDatas} = useRefuelTriggerStore();
    const realm = useRealm();
    const {id} = useUserStore();
    const {vehId , name} = useVehicleStore();
    const [curVehid , setCurVehId] = useState(vehId);
    const [data , setData] = useState<DataInterface>({  odometerStart :-1 , odometerEnd : -1 , fuelConsumed : -1 , price : -1 , vehId : new BSON.ObjectID});
    const [date , setDate] = useState<Date>(new Date)
    const [open, setOpen] = useState(false);
    const {VehiclesArray} = useVehicleArrayStore();
    const [vehName , setVehName] = useState(name);
    const [valueError , setValueErrors] = useState<boolean[]>([true , true , true , true]);
    const [errorText , setErrorText] = useState('');


    useFocusEffect(React.useCallback(()=>{
        validate(valueError , date , data);
    } , [valueError , date , data]))
    const handleData = (type : string, payload : BSON.ObjectId | Date )=>{
        if(type === 'vehicle' && payload instanceof BSON.ObjectId){
            setData({...data , vehId : payload});
        }else if(type == 'date' && payload instanceof Date){
            setDate(payload);
        }
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
        const newId = new BSON.ObjectId()
        const curDate = new Date();
        realm.write(()=>{
            realm.create('Refueling' , {
                _id : newId,
                ...data ,
                date,
                userId : id,
                curDate : curDate,
                vehId : curVehid
            })
        })
        addRefuelData({_id : newId,
        ...data ,
        date ,
        userId : id,
        vehId : curVehid,
        curDate : curDate})
        navigation.navigate('refuelingInfo');
        }

        const handleSelectChange = (val : BSON.ObjectId) =>{
            setCurVehId(val) ;
            VehiclesArray.map((veh)=>{
                if(val.equals(veh._id)){
                    setVehName(veh.name);
                }
            })
            
        }
        function isStringConvertibleToFloat(str : string) {
            const floatRegex = /^\d*\.?\d*$/;
            
            return floatRegex.test(str) && !isNaN(parseFloat(str));
          }

          function isStringConvertibleToInteger(str : string) {
            const integerRegex = /^\d+$/;
            return integerRegex.test(str) && !isNaN(parseInt(str, 10));
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

            if(i != sortedRefuelData.length){
                const a = sortedRefuelData[i]?.odometerStart as NonNullable<number>
                res = res && (ignoreTimedate(sortedRefuelData[i]?.date as NonNullable<Date>)  >= theDateIgnoreTime && theDateIgnoreTime && odometerEnd <= a);
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
            }else if(daata.odometerStart < 0 || daata.odometerEnd < 0){
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
        const [open1 ,setOpen1] = useState(false);
  return (
    <Pressable style={{flex : 1}} onPress={()=>setOpen1(false)}>
    <KeyboardAvoidingView style={styles.container}>
        
        <View style={styles.top}>
            <HeaderWithBackbutton handlePress={navigateToRefueling}/>
            <Text style={styles.heading}>Add Refuelling Record</Text>
        </View>
        
        
        <View style={styles.middle}>
            {   VehiclesArray.length > 0 &&
                <PickerRefuelingForm open={open1} setOpen={setOpen1} name={vehName} list={VehiclesArray} handleSelectChange={handleSelectChange} conStyles={Dimensions.get('window').width * 0.9}/>
            }
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
                date={ new Date()}
                mode='date'
                onConfirm={(date) => {
                    setOpen(false)
                    handleData('date' , date);
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <TextWith2Inputs getData={getOdometerData} heading = "Odometer" inp1='Start reading'  inp2 ='End reading'/>
            <TextWith2Inputs getData={getFuelData} heading = "Fuel" inp1='Consumed (in L)'  inp2 ='Price (in S$)'/>

            <Text style={styles.error}>{errorText}</Text>
        </View>
        
        <View style={styles.bottom}>
            <DoubleButton textHollow ="Cancel" handlehollowPress={()=>navigation.navigate('refuelingInfo')} handleSolidPress={handleSubmit}
              solidDisabled = { errorText.length > 0}
            textSolid='Add'
          />
           
        </View>
        
    </KeyboardAvoidingView>
    </Pressable>
  )
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center'
    },top:{
        flex : 0.2,
        marginBottom : 20,
        width : '100%'
    },
    heading : {
        textAlign:'center',
        fontSize : 22,
        color : 'black',
      fontFamily : 'NewRubrik-Medium'

    },middle :{
        alignItems : 'center',
        flex : 0.75,
        marginBottom : 120,
    },input : {
        width : width * 0.9,
        backgroundColor: 'white',
        padding : 10,
        borderRadius : 10,
        marginVertical : 25,
        flexDirection :'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    bottom :{
        position : 'absolute',
        bottom : 20,
        alignItems : 'center',
    },text : {
      fontFamily : 'NewRubrik-Medium',
      fontSize : 15,
      color :  '#0B3C58',

    },error :{
        color : 'crimson'
    },dateText : {
        color : '#6D8A9B',
        fontSize : 11
    }
})

export default RefuelingForm