import React, { useState } from "react";
import { ScrollView, Switch, TouchableOpacity, Alert } from "react-native";
import { Left, ListItem, Text, Separator, Button, Right } from "native-base";
import moment from "moment";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const LostAndFoundList = (props) => {
  return (
    <ScrollView>
      <ListItem>
        <Text>Comming Soon!</Text>
      </ListItem>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    setAnonymous: (x) => dispatch({ type: "SET_ANONYMOUS", value: x }),
    // storeUserId: (id,fname,sname,email) => dispatch({ type: "STORE_USER_ID", value: id, value1:fname, value2:sname, value3:email})
  };
};

export default connect(mapStateToProps, mapDispachToProps)(LostAndFoundList);
