import React from "react";
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
import { useNavigation } from "@react-navigation/native";

const AddEventHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={{ height: Platform.OS === "android" ? "8%" : null, zIndex:5 }}>
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => navigation.navigate("Court")}>
            <Icon name="arrow-back" style={{ color: "black" }} />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: "black" }}>Create Event</Title>
        </Body>
      </Header>
    </View>
  );
};

export default AddEventHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#e3e8e6",
    ...Platform.select({
      ios: {
        borderBottomWidth: 0,
      },
      android: {
        top: "5%",
        borderBottomWidth: 0,
        elevation: 0,
      },
    }),
  },
});
