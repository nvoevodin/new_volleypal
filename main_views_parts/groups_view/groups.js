import React, { useState } from "react";
import { Octicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  Image,
  View,
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Icon,
  Button,
  Left,
  Right,
  Body,
  Title,
  Text,
  Tab,
  Tabs,
  TabHeading,
} from "native-base";
import { connect } from "react-redux";
//import * as Playground from './functions/selectPlayground';
import { useNavigation } from "@react-navigation/native";
import {
  deleteGroup,
  requested,
  leaveGroup,
  joinHiddenGroup,
  requestToJoin,
  joinGroup,
} from "./functions/groupFunctions";

const GroupsTab = (props) => {
  const navigation = useNavigation();
  //console.log(props.groups)

  const selectGroup = async (title, groupId, adminId) => {
    //console.log(title)
    await props.setGroupInfo(title, groupId, adminId);
    navigation.navigate("GroupView");
  };

  const deleteGroupFunc = (id, len) => {
    Alert.alert(
      "Delete Group?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            if (len > 9) {
              alert("Cant delete a group with more than 10 people in it!");
            } else {
              deleteGroup(id);
              alert("Deleted");
              props.triggerFunc();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Content>
      <List>
        {props.groups.map((object, index) => (
          <View key={index}>
            {(object["status"] == "hidden" &&
              object.invited.some((i) => i === props.reducer.userInfo[0])) ||
            (object["status"] == "hidden" &&
              object.members.some((i) => i === props.reducer.userInfo[0])) ||
            object["status"] != "hidden" ? (
              <ListItem>
                <Left>
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      {
                        object["status"] === "public" ||
                        object["admin_id"] === props.reducer.userInfo[0] ||
                        object.members.some(
                          (i) => i === props.reducer.userInfo[0]
                        )
                          ? selectGroup(
                              object["group_name"],
                              object["group_id"],
                              object["admin_id"]
                            )
                          : alert("Private group.");
                      }
                    }}
                  >
                    <Text>{object["group_name"]}</Text>
                  </TouchableOpacity>
                </Left>

                <Right>
                  {object["admin_id"] === props.reducer.userInfo[0] ? (
                    <TouchableOpacity
                      onPress={() => {
                        deleteGroupFunc(
                          object["group_id"],
                          object["members"].length
                        );
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                  ) : object.waiting.some(
                      (i) => i === props.reducer.userInfo[0]
                    ) ? (
                    <TouchableOpacity onPress={() => requested()}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "blue",
                        }}
                      >
                        Waiting
                      </Text>
                    </TouchableOpacity>
                  ) : object.members.some(
                      (i) => i === props.reducer.userInfo[0]
                    ) ? (
                    <TouchableOpacity
                      onPress={() => {
                        leaveGroup(
                          props.reducer.userInfo[0],
                          object["group_id"]
                        );
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        Leave
                      </Text>
                    </TouchableOpacity>
                  ) : object.invited.some(
                      (i) => i === props.reducer.userInfo[0]
                    ) ? (
                    <TouchableOpacity
                      onPress={() => {
                        joinHiddenGroup(
                          props.reducer.userInfo[0],
                          object["group_id"]
                        );
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "green",
                        }}
                      >
                        Join
                      </Text>
                    </TouchableOpacity>
                  ) : object["status"] == "public" ? (
                    <TouchableOpacity
                      onPress={() => {
                        joinGroup(
                          props.reducer.userInfo[0],
                          object["group_id"]
                        );
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "green",
                        }}
                      >
                        Join
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        requestToJoin(
                          props.reducer.userInfo[0],
                          object["group_id"]
                        );
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "green",
                        }}
                      >
                        Request
                      </Text>
                    </TouchableOpacity>
                  )}
                </Right>
              </ListItem>
            ) : null}
          </View>
        ))}
      </List>
    </Content>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 100,
  },
});

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    setGroupInfo: (title, groupId, adminId) =>
      dispatch({ type: "SET_GROUP_INFO", value: [title, groupId, adminId] }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(GroupsTab);

//     <View style = {{flex:1, flexDirection:'row', justifyContent:'space-between'}}>

//     <View>
//     <View style={{alignSelf:'flex-start'}}>
// <Text style = {{fontWeight:'bold'}}>{object["group_name"]}</Text>
//        </View>
//       <View>
//       <Text>Members:  {JSON.parse(object["members"]).length}</Text>
//       </View>

//     </View>
//     <View style={{alignSelf:'center'}}>
//    <Button><Text>Join</Text></Button>
//    </View>
//    </View>
