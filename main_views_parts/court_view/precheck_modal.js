import { connect } from "react-redux";

import React from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";

const moment = require("moment");

const PreCheckModal = (props) => {

  const handleConfirm = async (date) => {
    var a = new Date(moment().utc().format());

    var b = new Date(moment(date).utc().format());

    if (b - a < 0) {
      alert("Select later time!");
      props.toggle_timer_modal();
    } else {
      fetch(
        // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
        `${global.x}/preCheck?time=${date}&site_id=${
          props.reducer.playgroundId
        }&first_name=${
          props.reducer.anonymous ? "Anonymous" : props.reducer.userInfo[1]
        }
        &last_name=${
          props.reducer.anonymous ? "Player" : props.reducer.userInfo[2]
        }&user_id=${props.reducer.userInfo[0]}`,
        { method: "POST" }
      ).catch((error) => {
        console.log(error);
      });

      await props.passToPreCheck(true);
      props.toggle_timer_modal();

      alert(`Success! You are coming around ${moment(date).format("LT")}.`);
    }
  };
 
  return (
    
    <DateTimePickerModal
   
    isDarkModeEnabled={false}
      isVisible={props.reducer.preCheckModal}
      mode="time"
      onConfirm={(date) => {
        handleConfirm(moment.utc(date).format());
      }}
      onCancel={props.toggle_timer_modal}
    />
  );
};

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    toggle_timer_modal: () =>
      dispatch({ type: "TOGGLE_TIMER_MODAL", value: false }),
    //storePreCheck: () => dispatch({ type: "STORE_PRECHECK", value: true})
  };
};

export default connect(mapStateToProps, mapDispachToProps)(PreCheckModal);
