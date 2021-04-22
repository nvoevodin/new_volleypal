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
import { ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GroupsHeader = (props) => {
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
        <Right>
          <Button
            rounded
            style={{ backgroundColor: "rgba(212, 190, 190, 0.85)" }}
            onPress={() => navigation.navigate("AddGroup")}
          >
            <Text style={{ color: "green", fontWeight: "bold" }}>
              Add Group
            </Text>
            {/* <Entypo name="plus" size={28} color="black" /> */}
          </Button>
        </Right>
      </View>
      <ImageBackground
        source={{ uri: `${global.x}` + "/" + props.playgroundImage }}
        style={{ width: "100%", height: "100%", zIndex: 1 }}
      ></ImageBackground>
    </View>
  );
};

export default GroupsHeader;

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
