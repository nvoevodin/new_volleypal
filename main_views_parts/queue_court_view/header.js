import React, { useState, useEffect } from "react";
import { View, Platform, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
} from "native-base";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

const HomeHeader = (props) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 2 }}>
      <View
        style={{
          position: "absolute",
          top: "12%",
          flexDirection: "row",
          padding: "2%",
          zIndex: 2,
        }}
      >
        <Left>
          <Button
            rounded
            style={{ backgroundColor: "rgba(212, 190, 190, 0.85)" }}
            onPress={() => navigation.navigate("Courts")}
          >
            <Icon name="arrow-back" style={{ color: "black" }} />
          </Button>
        </Left>

        <Right></Right>
      </View>
      <ImageBackground
        source={{ uri: `${global.x}` + "/" + props.playgroundImage }}
        style={{ width: "100%", height: "100%", zIndex: 1 }}
      ></ImageBackground>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    //toggle_timer_modal: () => dispatch({ type: "TOGGLE_TIMER_MODAL", value: true}),
    //cancelPreCheck: () => dispatch({ type: "TOGGLE_PRECHECK", value: false }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(HomeHeader);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        borderBottomWidth: 0,
      },
      android: {
        top: "6%",
        borderBottomWidth: 0,
        elevation: 0,
      },
    }),
  },
});
