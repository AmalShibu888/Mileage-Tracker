
import { useState } from 'react'
import { View ,TextInput, Text, StyleSheet, Dimensions} from 'react-native'
import RefuelFormInput from './Inputs/RefuelFormInput'
import { FC } from 'react'

interface Props {
    heading : string
    inp1 : string
    inp2 : string
    getData : (a : string[])=>void;
    values ?: number[]
}


const TextWith2Inputs : FC<Props> = ({heading , inp1 , inp2,getData , values}) => {
    let st1 = '' , st2 = ''
    if(values && values[0] && values[1]){
        st1 = values[0].toString()
        st2 = values[1].toString()
    }
    const [data , setData] = useState<string[]>([st1 , st2]);

    const handleData= (action : string , payload : string)=>{
        if(action == 'inp1' && data[1] != null ){
            setData([payload , data[1]])
            getData([payload , data[1]]);
        }else if(data[0] != null ){
            setData([data[0] , payload]);
            getData([data[0] ,payload ]);
        }
    }
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>{heading}</Text>
        <View style={styles.inputsContainer}>
            <RefuelFormInput placeholder={inp1} id='inp1' handleData={handleData} val={values ? st1 as NonNullable<string>  : inp1}/>
            <RefuelFormInput placeholder={inp2} id='inp2' handleData={handleData} val={values ? st2 as NonNullable<string> : inp2}/>

           
        </View>
    </View>
  )
}
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    container :{
        marginBottom : 20,
        width : width * 0.9
    },heading : {
        fontSize : 15,
        color : 'black',
        fontFamily : 'NewRubrik-Medium'
    },input : {
        backgroundColor : 'white',
        width : 144,
        borderRadius : 4,
        padding : 10
    },inputsContainer : {
        flexDirection : 'row',
        marginTop:10,
        justifyContent : 'space-between'

    }
})

export default TextWith2Inputs