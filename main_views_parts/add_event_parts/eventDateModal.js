import { connect } from "react-redux";

import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const moment = require("moment");

const EventDateModal = (props) => {
  const handleConfirm = async (date) => {
    var a = new Date(moment().utc().format());

    var b = new Date(moment(date).utc().format());

    if (moment(a).isAfter(b, "day")) {
      alert("Select later time!");
      props.toggle_eventdate_modal();
    } else {
      props.setEventDate(date);

      Alert.alert(
        "Success!",
        `Event is set to ${moment(date).format("ll")}.`,
        [{ text: "OK", onPress: () => props.toggle_eventdate_modal() }],
        { cancelable: false }
      );
    }
  };

  return (
    <DateTimePickerModal
      isVisible={props.reducer.eventDateModal}
      mode="date"
      onConfirm={(date) => {
        handleConfirm(moment(date).format());
      }}
      onCancel={props.toggle_eventdate_modal}
    />
  );
};

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    toggle_eventdate_modal: () =>
      dispatch({ type: "TOGGLE_EVENTDATE_MODAL", value: false }),
    setEventDate: (date) => dispatch({ type: "SET_EVENTDATE", value: date }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(EventDateModal);
