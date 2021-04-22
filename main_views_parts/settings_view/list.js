import React, { useState } from "react";
import { ScrollView, Switch, TouchableOpacity, Alert } from "react-native";
import { Left, ListItem, Text, Separator, Button, Right } from "native-base";
import moment from "moment";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangeInfo from "./changeInformationModal";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const SettingsList = (props) => {
  const navigation = useNavigation();
  const [anonymous, setAnonymous] = useState(props.reducer.anonymous);
  const [modalVisible, setModalVisible] = useState(false);

  const deleteAccount = async () => {
    Alert.alert(
      `Delete account.`,
      `Are you sure you want to delete your account?`,
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            AsyncStorage.removeItem("user_info");

            fetch(
              // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
              `${global.x}/delete_user?uid=${props.reducer.userInfo[0]}`,
              { method: "DELETE" }
            )
              .then(
                firebase
                  .auth()
                  .currentUser.delete()
                  .then(function () {
                    alert("deleted");
                  })
                  .catch(function (error) {
                    alert(error);
                  })
              )
              .then(logout())
              .catch((error) => {
                console.log(error);
              });

            //           firebase.auth().currentUser.delete().then(function () {
            //

            // alert('You deleted your account.')

            //           }).catch(function (error) {
            //             console.log(error)
            //             alert('Important action! Log into the app again and try one more time.')
            //           })
          },
        },
      ],
      { cancelable: false }
    );
  };

  const logout = () => {
    props.signedIn(false);
    firebase
      .auth()
      .signOut()
      .catch((error) => console.log(error));

    navigation.navigate("Courts");
  };

  //CHANGE INFO MODAL TOGGLE
  const showModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleAnonymous = () => {
    props.setAnonymous(!anonymous);
    setAnonymous(!anonymous);
    try {
      AsyncStorage.setItem("anonymous", JSON.stringify(!anonymous));
    } catch (e) {
      console.log(e);
      console.log("something wrong (storage)");
    }
  };

  const changeInfoInfo = () => {
    Alert.alert(
      `Change personal information.`,
      `You can change your first and last names here.`,
      [{ text: "Got it", onPress: () => {} }],
      { cancelable: false }
    );
  };

  const deleteAccountInfo = () => {
    Alert.alert(
      `Delete account.`,
      `You can delete your account here.`,
      [{ text: "Got it", onPress: () => {} }],
      { cancelable: false }
    );
  };

  const anonymousInfo = () => {
    Alert.alert(
      `Anonymous information.`,
      `You can toggle yourself anonymous here. Once anonymous, when you check in or pre-checkin, instead of your name and last name it will say "Anonymous Player"`,
      [{ text: "Got it", onPress: () => {} }],
      { cancelable: false }
    );
  };

  return (
    <ScrollView>
      <ListItem>
        <Left>
          <Text>Name</Text>
        </Left>
        <Text>
          {props.reducer.userInfo[1] + " " + props.reducer.userInfo[2]}
        </Text>
      </ListItem>

      {/* <Separator bordered>
            <Text>PLAYERS</Text>
          </Separator> */}

      <ListItem>
        <Left>
          <Text>User Id</Text>
        </Left>
        <Text>{props.reducer.userInfo[3]}</Text>
      </ListItem>
      <ListItem>
        <Left>
          <Text>Anonymous: </Text>
          {props.reducer.anonymous ? <Text>Yes</Text> : <Text>No</Text>}
          <TouchableOpacity onPress={() => anonymousInfo()}>
            <AntDesign
              style={{ marginLeft: 10 }}
              name="questioncircleo"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </Left>
        <Right>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={props.reducer.anonymous ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleAnonymous()}
            value={props.reducer.anonymous}
          />
        </Right>
      </ListItem>
      <ListItem>
        <Left>
          <Button
            style={{ backgroundColor: "green" }}
            onPress={() => showModal()}
          >
            <Text>Change Info</Text>
          </Button>
        </Left>
        <TouchableOpacity onPress={() => changeInfoInfo()}>
          <Text>Info</Text>
        </TouchableOpacity>
      </ListItem>
      <ListItem last>
        <Left>
          <Button
            style={{ backgroundColor: "red" }}
            onPress={() => deleteAccount()}
          >
            <Text>Delete Account</Text>
          </Button>
        </Left>
        <TouchableOpacity onPress={() => deleteAccountInfo()}>
          <Text>Info</Text>
        </TouchableOpacity>
      </ListItem>

      <ChangeInfo modalVisible={modalVisible} showModal={() => showModal()} />
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
    signedIn: (x) => dispatch({ type: "STORE_USER_STATUS", value: x }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(SettingsList);
