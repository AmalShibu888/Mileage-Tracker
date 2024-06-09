import React, { FC } from 'react'
import { StyleSheet, View ,Text } from 'react-native'
interface Props {
  text1 : string
  text2 : string
}
const TwoTexts : FC<Props> = ({text1 , text2}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{text1}</Text>
        <Text style={styles.text}>{text2}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginVertical : 6
    },text : {
      fontFamily : 'NewRubrik-Medium',
      color :'#0B3C58'
    }
})

export default TwoTexts