import React, { FC } from 'react'
import { VictoryChart , VictoryAxis , VictoryLine , VictoryScatter ,VictoryTheme} from 'victory-native'
const data = [{mileage : null , month : 'jan'} , {mileage : 10 , month : 'dec'}]

interface Prop{ 
    mileageChartData  :{
        mileage : number | null;
        month : number
    }[]
}

const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

const LineChart : FC<Prop> = ({mileageChartData}) => {
  return (
    <VictoryChart padding={{ top: 30, right: 50, bottom: 50, left: 50 }} 
                domainPadding={20} width= {370} theme={VictoryTheme.material} >
                <VictoryAxis
                    style={{ 
                    ticks : {stroke: "transparent"} ,
                    grid : {stroke : 'transparent'}}}
                    tickFormat={(t)=>months[t%12]}
                />
        
                 <VictoryAxis dependentAxis  
                 style={{ axis: { stroke: "transparent" } ,
                 ticks : {stroke: "transparent"},
                 grid: { stroke: '#CED8DE' , strokeDasharray : [0,0] }}}
                 
                 />
                    <VictoryScatter
                        size={5}
                        style={{ data: { fill: "#EB655F" },
                         }}
                        data={mileageChartData}
                        x="month"
                        y="mileage"
                    />
                    <VictoryLine
                        style={{
                        data: { stroke: "#EB655F" },
                        parent: { padding : 100}
                        }}
                        x = "month"
                        y = "mileage"
                        data={mileageChartData}
                        interpolation="cardinal"
                    />
                </VictoryChart>
  )
}

export default LineChart