import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

import AddEventHeader from "../main_views_parts/add_event_parts/header";
import AddEventBody from "../main_views_parts/add_event_parts/body";

const AddEventView = (props) => {
  return (
    <React.Fragment>
      <AddEventHeader />
      <AddEventBody />

      <StatusBar style="auto" />
    </React.Fragment>
  );
};
export default AddEventView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
