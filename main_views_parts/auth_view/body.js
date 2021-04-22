import React from "react";
import { Header, Content, Tab, Tabs } from "native-base";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
//import MainList from './first_tab'
import SignIn from "./sign_in";
import SignUp from "./sign_up";
// import Tab3 from './tabThree';
const AuthBody = (props) => {
  const navigation = useNavigation();
  return (
    <>
      <Tabs tabBarUnderlineStyle={{ backgroundColor: "grey" }}>
        <Tab
          tabStyle={{ backgroundColor: "white" }}
          activeTextStyle={{ color: "grey", fontWeight: "bold", fontSize: 16 }}
          activeTabStyle={{ backgroundColor: "white" }}
          textStyle={{ color: "grey", fontWeight: "normal" }}
          heading="Sign In"
        >
          <SignIn />
        </Tab>
        <Tab
          tabStyle={{ backgroundColor: "white" }}
          activeTextStyle={{ color: "grey", fontWeight: "bold", fontSize: 16 }}
          activeTabStyle={{ backgroundColor: "white" }}
          textStyle={{ color: "grey", fontWeight: "normal" }}
          heading="Sign Up"
        >
          <SignUp />
        </Tab>
      </Tabs>
    </>
  );
};

export default AuthBody;
