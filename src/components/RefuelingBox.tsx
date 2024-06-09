import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, View ,Text ,ScrollView, Dimensions} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import RefuelingCard from './RefuelingCard';
import { useQuery } from '@realm/react';
import { Refueling } from '../Database/models/RefuelingSchema';
import Picker from './Picker/Picker';
import { RefuelInterface } from '../Database/interfaces';
import { BSON } from 'realm';
import PickerRefuelingBox from './Picker/PickerRefuelingBox';
import useRefuelTriggerStore from '../state/RefuelTrigger';
import { useFocusEffect } from '@react-navigation/native';

const rnpData : RNPInterface[] = [
    {name : 'All Time' , _id : 3},
    {name : 'Last 1 Year' , _id : 2},
    {name : 'Last 30 Days' , _id : 1},
    {name : 'Last 7 Days' , _id : 0},
]

interface RNPInterface  {
    name : string;
    _id : number
}

interface Props  {
    navigation : any,
    open :boolean,
    setOpen : (a : boolean)=>void
}

const RefuelingBox : FC<Props> = ({ navigation , open , setOpen}) => {
    const  {refuelDatas} = useRefuelTriggerStore();
    const today = moment();
    const [filteredData , setFilteredData] = useState<RefuelInterface[]>([...refuelDatas]); 
    const [value , setvalue] = useState(3);
    const allRefueling = useQuery(Refueling);
    const [rnpDataName , setRnpDataName] = useState<string>(rnpData[0]?.name as NonNullable<string>);
    const [loading , setLoading] = useState(true);

    useFocusEffect(React.useCallback(()=>{
        setLoading(true);
        handleSelectChange(value);
    }, [refuelDatas]))

    const getData =(value : number)=>{
        const current = new Date();
        const date =new Date();
        if(value == 1){
            date.setDate(current.getDate() - 30);
        }else if(value == 0){
            date.setDate(current.getDate() - 7);
        }else if(value == 2){
            date.setFullYear(current.getFullYear() - 1);
        }else{
                return refuelDatas
        }
        const newData = refuelDatas.filter((curdata)=> curdata.date >= date);
            return newData;
    }


    const handleSelectChange = (value  : number | BSON.ObjectId)=>{
        const current = new Date();
        const date =new Date();
        if(value == 1){
            date.setDate(current.getDate() - 30);
            setvalue(1);
            setRnpDataName(rnpData[2]?.name as NonNullable<string>);
        }else if(value == 0){
            date.setDate(current.getDate() - 7);
            setvalue(0);
            setRnpDataName(rnpData[3]?.name as NonNullable<string>);
        }else if(value == 2){
            date.setFullYear(current.getFullYear() - 1);
            setvalue(2)
            setRnpDataName(rnpData[1]?.name as NonNullable<string>);
        }else{
            
            setFilteredData((cur)=>{
                setLoading(false);
                return refuelDatas
            });
            setvalue(3)
            setRnpDataName(rnpData[0]?.name as NonNullable<string>);
            return;
        }
        const newData = refuelDatas.filter((curdata)=> curdata.date >= date);
        setFilteredData((cur)=>{
            setLoading(false);
            return newData;
        });

    }
  return (
    <View style={styles.container}>
        <View style={styles.PickerCont}>
        <PickerRefuelingBox open={open} setOpen={setOpen} name={rnpDataName} list={rnpData} handleSelectChange={handleSelectChange} conStyles={175}/>
            <Text style={styles.heading}>{getData(value).length} Records | {value === 3 ? 'All Time' : today.subtract(value == 0 ? 7 : value == 1 ?30 : 1 , value == 2 ? 'years' :'days').format('DD/MMM/YY') + "- Today"}</Text>
        </View>

        <ScrollView style={styles.refuelingDataBox}>
            {
                !loading &&
                getData(value).map((el , index)=>
                    <RefuelingCard key={index} data={el._id} ind={1} navigation={navigation}/>
                )
            }
        </ScrollView>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        width : Dimensions.get('window').width,
        flex : 1,
        zIndex : 0
    },heading :{
        textAlign : 'center',
        marginTop : 20,
        fontFamily : 'NewRubrik-Medium'
    },refuelingDataBox : {
        marginTop : 30
    },PickerCont:{
        zIndex : 1
    }
})


export default RefuelingBox