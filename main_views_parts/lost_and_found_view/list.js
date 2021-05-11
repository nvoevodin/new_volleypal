import React, { useState } from "react";
import { ScrollView, Switch, TouchableOpacity, Alert,Image,
  View, StyleSheet} from "react-native";
import { Left, ListItem, Text, Separator, Button, Right } from "native-base";
import moment from "moment";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const LostAndFoundList = (props) => {
  return (
    <ScrollView style = {{top:10}}>
      <ListItem>

                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmm2F_HT_3s2OOsWp6BaStWfjOpJj9Z6vVpIPUp4aSeRCOV5N7N9wuRlIFUHVMQX3oQcw&usqp=CAU"
                       
                  }}
                />
                {/* <Text>{object["site_name"]}</Text> */}

                <View
                  style={{
                    marginLeft: 10,
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignSelf: "flex-start" }}>
                    <Text style={{ fontWeight: "bold" }}>
                      Mikasa Ball Found
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ textTransform: "capitalize" }}>
                      354-643-0000
                      </Text>
                    </View>

                    <View>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={{ alignSelf: "flex-start", color: "green" }}>
                    <Text style={{ color: "green" }}>
                      2 days ago
                    </Text>
                  </View>
                </View>
             
            </ListItem>
      {/* <ListItem>
        <Text>Comming Soon!</Text>
      </ListItem> */}
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
const styles = StyleSheet.create({
  tinyLogo: {
    width: 130,
    height: 105,
    borderRadius: 5,
  },
});