import React, { useEffect, useRef, useState } from 'react'
import { View  , StyleSheet, TextInput, Text  } from 'react-native'

const passcode = ['' , '' ,'' ,''];
const PasscodeEntry = ({heading , subtitle , getData}) => {
    const [cursor , setCursor] = useState(5);
    const [data , setData] = useState('');
    const inp1 = useRef(null);
    const inp2 = useRef(null);
    const inp3 = useRef(null);
    const inp4 = useRef(null);

    useEffect(()=>{
        inp1.current.focus();
    },[])

    const handleKeyPress = (e)=>{
            if (cursor > 1 && e.nativeEvent.key === 'Backspace' ) {
                setData((curData) => {
                    getData(curData.slice(0 , -1));
                    return curData.slice(0 , -1)
                });
                setCursor((curCursor) => curCursor - 1);
            }
    }

    const handlechange = (id , text)=>{
        setData((data)=>{
            getData(data + text);
            return data + text;
        })
        setCursor((cursor)=>{
            if(cursor == 1)
                inp2.current.focus();
            else if(cursor == 2)
                inp3.current.focus();
            else if(cursor == 3)
                inp4.current.focus();
            else{
                inp4.current.blur();
            }
            return cursor + 1;
        })
    }

  return (
    
    <View style={styles.container} >
            <Text style={styles.passHeading}>{heading}<Text style = {styles.star}>*</Text></Text>
            {subtitle && <Text>{subtitle}</Text>}
            <View style = {styles.inputContainer}>
                <TextInput ref={inp1} keyboardType='numeric' onKeyPress={handleKeyPress} onFocus={handleFocus}  onChangeText={(text)=>handlechange(0  ,text)}  style={styles.input}  value={data[0] || ''}/>
                <TextInput ref={inp2} keyboardType='numeric' onKeyPress={handleKeyPress} onFocus={handleFocus} onChangeText={(text)=>handlechange(1  ,text)}  style={styles.input}  value={data[1] || ''}/>
                <TextInput ref={inp3} keyboardType='numeric' onKeyPress={handleKeyPress} onFocus={handleFocus} onChangeText={(text)=>handlechange(2  ,text)}  style={styles.input}  value={data[2] || ''}/>
                <TextInput ref={inp4} keyboardType='numeric' onKeyPress={handleKeyPress} onFocus={handleFocus} onChangeText={(text)=>handlechange(3  ,text)}  style={styles.input}  value={data[3] || ''}/>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        marginBottom : 15
    },
 passHeading : {
        fontSize : 20,
        color : 'black',
        marginBottom : 5,
        fontFamily : 'NewRubrik-Medium'
    },star :{
        color : 'crimson'
    },input : {
        backgroundColor : 'white',
        flex : 1,
        padding : 10,
        alignItems : 'center',
        margin : 10,
        textAlign : 'center',
        borderRadius : 5,
        fontFamily : 'NewRubrik-Medium'
    },inputContainer : {
        flexDirection : 'row',
        justifyContent : 'space-around'
    }
})

export default PasscodeEntry