import React, { useState } from 'react'
import RNFS from 'react-native-fs';
import { StyleSheet, View , Text , Image , TextInput  ,Pressable, KeyboardAvoidingView, Dimensions  } from 'react-native'
import HeaderWithBackbutton from '../components/HeaderWithBackbutton'
import { useRealm } from '@realm/react';
import { BSON } from 'realm';
import useUserStore from '../state/Users';
import {launchImageLibrary} from 'react-native-image-picker';
import { Vehicles } from '../Database/models/VehiclesSchema';
import DoubleButton from '../components/Buttons/DoubleButton';
import useVehicleArrayStore from '../state/VehiclesArray';
import useVehicleStore from '../state/Vehicles';
import RefuelFormInput from '../components/Inputs/RefuelFormInput';
import AddVehiclesFormInputs from '../components/Inputs/AddVehiclesFormInputs';
import { FC } from 'react';
import { NavigationContainerProps } from '@react-navigation/native';
import {  vehicleStackParamList } from '../types/Types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PickerVehiclesForm from '../components/Picker/PickerVehiclesForm';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  navigation : NativeStackNavigationProp<vehicleStackParamList ,'addVehiclesForm' >
}

interface dataInterface {
  name : string;
  engine : string;
  image : string;
  type : number
}

interface errorsInterface {
  name : string;
  type : string;
}

interface mediaTypeInterface {

}

const errorstext = ['vehicle name cannot be empty' ,'vehicle type cannot be empty' ];
const vehicleTypes = [
  'Vehicle Type',
 '2 Wheeler',
 '3 Wheeler',
 '4 Wheeler',
 'other', 
]
const AddVehiclesForm : FC<Props> = ({navigation}) => {
  
const sampleImages = [`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`
,'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']


  const {addVehicleState, VehiclesArray} = useVehicleArrayStore();
  const {id} = useUserStore()
  const [data ,setData] = useState<dataInterface>({name : '',type :0 ,engine : '' ,image : '' });
  const [errors, setErrors] = useState<errorsInterface>({name : '0' as NonNullable <string> , type :'0' as NonNullable <string>})
  const realm = useRealm();
  const {setVehicle} = useVehicleStore();
  const [typeName , setTypeName] = useState<string>('Vehicle Type')
const handlePress = ()=>{
  navigation.navigate('vehiclesInfo');
}

  
  const handleFieldChange = (command : string , payload : number | string) =>{
    if(command == 'name' && typeof(payload) == 'string'){
      setData((state)=>({...state , name : payload}));
      if(payload)
        setErrors({...errors , name : ''});
      else  
        setErrors({...errors , name : errorstext[0] as NonNullable<string>})
    }else if(command == 'type' && typeof(payload) == 'number'){
      setData((state)=>({...state , type : payload}));


      setTypeName(vehicleTypes[payload - 1] as NonNullable<string>)
      if(payload !== 0)
        setErrors({...errors , type : ''});
      else{
  
        setErrors({...errors , type : errorstext[1] as NonNullable<string>})

      }
    }else if(command == 'engine'  &&  typeof(payload) == 'string' && numberCheck(payload) ) {
      setData((state)=>({...state , engine : payload}))
    }else if(command == 'image' && typeof(payload) == 'string') {
      setData((stat)=>({...data , image : payload}));
    }
  }
 
  const numberCheck = (a : string)=>{
    if(a.length == 0)
      return true;
    return a[a.length  - 1] as NonNullable<string> >='0' && a[a.length - 1] as NonNullable<string> <='9'; 
  }


  const handleSubmit =  ()=>{
    const image = data.image || sampleImages[data.type - 2] as NonNullable<string>;
    const newId = new BSON.ObjectId;
    realm.write(()=>{
      realm.create('Vehicles' , {
        _id : newId,
        ...data,
        image : image,
        userId : id
      })
    })
    if(VehiclesArray.length == 0){
      setVehicle({...data,  image , userId : id , vehId : newId});

    }
    addVehicleState({_id : newId,
      ...data,
      image : image,
      userId : id});
      setData({name : '',type :0 ,engine : '' ,image : '' });
      setTypeName('Vehicle Type');
      navigation.navigate('congratz' , {image , name : data.name});

  }

  

  const openImagePicker = async () => {
    
    try {
      const options = {
        mediaType: 'photo',
        maxHeight: 2000,
        maxWidth: 2000,
      };
      const result = await launchImageLibrary(options);
      if (!result.didCancel && !result.errorCode && result.assets) {
        const source = { uri: result.assets[0]?.uri as NonNullable<string>};
        const base64Image = await RNFS.readFile(source.uri, 'base64');
        handleFieldChange('image' , base64Image);
      } else {
      }
    } catch (error) {
      console.error('Error launching image library:', error);
    }

  };

  
  const [open , setOpen] = useState(false);
  return (
    <Pressable style={{flex : 1}} onPress={()=>setOpen(false)}>
    <KeyboardAvoidingView style={styles.container}>
      <View style={{backgroundColor : '#EB655F' , width : '100%'}}>
        <View style={{backgroundColor : '#F0F2F2' , width : '100%'}}>
          
            <HeaderWithBackbutton handlePress={handlePress} />
        </View>
        </View>
        
        <View style={{backgroundColor : '#F0F2F2' , alignItems : 'center' , width : '100%' , zIndex : 1}}>
          
        <Text  style={styles.heading}> Add Vehicles</Text>
        <Pressable onPress={openImagePicker}>
          <Image style={styles.image} source={data.image ?{ uri: `data:image/png;base64,${data.image}` } : require('../rcs/addPhoto.png')} />
        </Pressable>
        <View style={styles.inputContainer}>
            <AddVehiclesFormInputs placeholder='Vehicle Name' id='name' handleData={handleFieldChange} val={data.name} Style={styles.input}/>
            <Text style={styles.error}>{  errors.name.length > 1? errors.name : ''}</Text>
           <PickerVehiclesForm name={typeName} list={[
                { name: '2 Wheeler', _id: '2' },
                { name: '3 Wheeler', _id: '3' },
                { name: '4 Wheeler', _id: '4' },
                { name: 'other', _id: '5' },
            ]} handleSelectChange={handleFieldChange} conStyles={width *0.9} type='type' Styles={styles.Styles} open={open} setOpen={setOpen} />
            
            <Text style={styles.error}>{ errors.type.length > 1 ? errors.type : ''}</Text>
            <AddVehiclesFormInputs placeholder='Engine CC' id='engine' handleData={handleFieldChange} val={data.engine} Style={styles.input}/>
        </View>
        </View>
        <View style={styles.bottom}>
            <DoubleButton textHollow ="Cancel" handlehollowPress={()=>{setData({name : '',type :0 ,engine : '' ,image : '' });setTypeName('Vehicle Type');navigation.navigate('vehiclesInfo')}} handleSolidPress={handleSubmit}
              solidDisabled = {errors.name.length > 0  || errors.type.length > 0} textSolid='Add'
          />
        </View>
    </KeyboardAvoidingView>
    </Pressable>
  
    
  )
}
const width = Dimensions.get('window').width ;
const styles = StyleSheet.create({
    container : {
        flex : 1,

        alignItems : 'center',
    },
    input : {
        backgroundColor : 'white',
        width : width * 0.9,
        borderRadius : 7,
        marginTop : 20,
        paddingRight: 30,
        padding : 4,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    inputContainer : {
        zIndex : 1,
    },
    heading : {
        fontSize : 30,
        color : 'black',
        textAlign : 'center',
      fontFamily : 'NewRubrik-Medium',
      marginBottom : 30

    },bottom : {
        position :'absolute',
        bottom : 0,
        backgroundColor : '#F0F2F2',
        paddingBottom : 20
    },error : {
      color : 'crimson',
      marginTop : 7,
      fontFamily : 'NewRubrik-Medium'

    },image :{
      width : 100,
      height : 100,
      borderRadius : 50,
      marginBottom : 20
    },Styles : {
        textAlign :'left',
      fontFamily : 'NewRubrik-Medium'

    }
})



export default AddVehiclesForm