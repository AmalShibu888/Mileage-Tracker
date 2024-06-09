import React, { FC } from 'react'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {StyleSheet , View} from 'react-native'

interface Props {
  isfocused : boolean;
  getData : (a :string)=>void
  handleFullFill ?: (a :React.Component)=>void
}


export default class PasscodeInput extends React.Component <Props>{
    state = {
        code: '',
        password: '',
      };

    pinInput  = React.createRef()
  render(){
    const {code , password} = this.state
    return (
        <View style={styles.container}>
        <SmoothPinCodeInput password
        restrictToNumbers={true}

        cellSize={70}
        autoFocus={this.props.isfocused}
        maskDelay={1000}
        mask="X"
        cellSpacing ={20}
        textStyle={{
            fontSize: 24,
            color: 'black',
          }}
            cellStyle={{
            backgroundColor  : "white",
            borderRadius : 5,
            height : "80%"
        }}
            ref={this.pinInput}
            value={code}
            onTextChange={(code : string) => {
              this.setState({ code })
              this.props.getData(code);
            }}
            onFulfill={(data : string)=>{
              {this.props.handleFullFill && this.props.handleFullFill(this)};
            }}
            onBackspace={() => {}}
        />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    textStyle :{
        color : 'black'
    }
})