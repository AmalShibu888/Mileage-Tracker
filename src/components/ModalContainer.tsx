import React from 'react'
import { View ,Modal , StyleSheet ,Text, Pressable} from 'react-native'
import { FC } from 'react'
interface Props {
  modalVisible : boolean
  modaltext : string ;
  handleAccept : ()=>void;
  modalSub ?: string;
   handleReject : ()=>void;
}
const ModalContainer : FC<Props> = ({modalVisible , modaltext , handleAccept ,modalSub , handleReject}) => {
  return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modaltext}</Text>
            {modalSub && <Text style={styles.modalSub}>{modalSub}</Text>}
            <View style={styles.buttons}>
                <Pressable
                onPress={handleReject}
                style={[styles.button, styles.buttonReject]}
                >
                <Text style={styles.rejectText}>No</Text>
                </Pressable>
                <Pressable
                style={[styles.button, styles.buttonAccept]}
                onPress={handleAccept}
                >
                <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : 'rgba(0,0,0,0.2)', 
      
    },
    modalView: {
      margin: 20,
      width : 350,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      opacity : 1
    },
    button: {
      borderRadius: 4,
      padding: 10,
      elevation: 2,
      width : 155,
      
    },
    buttonReject: {
      backgroundColor: 'white',
      color : 'black',
      borderColor : '#0B3C58',
      borderWidth : 1.5
    },
    buttonAccept: {
      backgroundColor: '#0B3C58',
    },
    textStyle: {
      color: 'white',
      textAlign: 'center',
      fontFamily : 'NewRubrik-Medium'
      
    },rejectText : {
      textAlign: 'center',
        color : '#0B3C58',
        fontFamily : 'NewRubrik-Medium'
    },
    modalText: {
      marginBottom: 15,
      color : '#0B3C58',
      fontSize : 16,
      width : '100%',
      fontFamily : 'NewRubrik-SemiBold'
    },
    buttons : {
        flexDirection : 'row',
        justifyContent :'space-between',
        width : 320,
        marginLeft : 15,
        marginRight : 15
    },modalSub :{
      width : '100%',
      color : '#58798C',
      fontSize : 14,
      marginBottom : 15
    }
  });

export default ModalContainer