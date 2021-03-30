import { connect } from 'react-redux';

import React, {useEffect, useState} from "react";
import {Alert} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const moment = require("moment");


 
 
const EventTimeModal = (props) => {





   const handleConfirm = async (date) => {

   console.log(date)
    var a = new Date(moment().utc().format())

    var b = new Date(moment(date).utc().format())



    if ((b-a) < 0){
      alert('Select later time!')
      props.toggle_eventtime_modal()
    } else {


      props.setEventTime(date)
   

      Alert.alert(
        "Success!",
        `Event is set to ${moment.utc(date).local().format('LT')}.`,
        [
          { text: "OK", onPress: () => props.toggle_eventtime_modal() }
        ],
        { cancelable: false }
      );

    }


  

  };





    
  return (
    
    
      <DateTimePickerModal
        isVisible={props.reducer.eventTimeModal}
        mode="time"
        onConfirm={(date) =>{handleConfirm(moment(date).format())}}
        onCancel={props.toggle_eventtime_modal}
      />
   
  )

}
 


const mapStateToProps = (state) => {
    
    const { reducer } = state
    return { reducer }
  };

  const mapDispachToProps = dispatch => {
    return {
      toggle_eventtime_modal: () => dispatch({ type: "TOGGLE_EVENTTIME_MODAL", value: false}),
      setEventTime: (date) => dispatch({ type: "SET_EVENTTIME", value: date})
      
     
    };
  };

  export default connect(mapStateToProps,
    mapDispachToProps
    )(EventTimeModal)