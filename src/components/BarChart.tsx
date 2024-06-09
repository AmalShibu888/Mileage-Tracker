import React from 'react'
import { StyleSheet, View ,Text} from 'react-native'
import { VictoryBar, VictoryChart, VictoryTheme ,VictoryAxis ,VictoryLine} from "victory-native";

import { FC } from 'react';

interface pricedataInterface {
    month : string , 
    price : number
  }
interface Props {
    priceChartData : pricedataInterface[]
}

const BarChart : FC<Props> = ({priceChartData}) => {
  return (
    <View>
        <Text style={styles.chartHeading} >Money spend on fuel</Text>
        <View style={styles.ChartContainer}>
        <View style={styles.chart}>
            <VictoryChart 
            padding={{ top: 30, right: 50, bottom: 50, left: 50 }}  
            domainPadding={20} width={370} 
            theme={VictoryTheme.material}
            >
                <VictoryAxis
                    style={{ 
                    grid: { stroke: 'transparent' },
                    ticks : {stroke: "transparent"},
               }}
                />

                <VictoryAxis dependentAxis  
                style={{ 
                    axis: { stroke: "transparent" } ,
                    ticks : {stroke: "transparent"} , 
                    grid: { stroke: '#CED8DE' , strokeDasharray : [0,0] }
                }}
                tickFormat={(t) => t >= 1000 ? `${t%1000 == 0 ? Math.round(t/1000) :(t/1000).toFixed(1)}k` : `${t}`}
                />
                <VictoryBar animate data= { priceChartData }
                style={{ data: { fill: "#EB655F" } }}
                x="month" y="price" />
            </VictoryChart>
        </View>    
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    chartHeading : {
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
        borderRadius : 8,
    },ChartContainer : {
        alignItems : 'center'
    }
})
export default BarChart