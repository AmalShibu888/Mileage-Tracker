import React, { FC } from 'react'
import { View  , StyleSheet , Text} from 'react-native'


interface Props{
  text : string ;
   value : string;
}

const WhiteBox : FC<Props> = ({text , value}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>{text}</Text>
        <Text style={styles.sub}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    backgroundColor :'white',
    padding : 10,
    borderRadius : 8,
    width : '48%'
  },heading :{
    fontSize : 16,
    marginBottom : 10,
    color : '#0B3C58',
    fontFamily : 'NewRubrik-Medium'
    
  },sub : {
    color : '#0B3C58',
    fontSize : 14,
    fontFamily : 'NewRubrik-Medium'


  }
})

export default WhiteBox