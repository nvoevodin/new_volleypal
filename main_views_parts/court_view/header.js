import React, { useState, useEffect } from "react";
import { View, Platform, StyleSheet, Linking, Alert } from "react-native";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import onShare from "./shareButton";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeHeader = (props) => {
  const navigation = useNavigation();

  const [defaultCourt, setDefaultCourt] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("defaultCourt", async (error, result) => {
      var res = JSON.parse(result);
      props.reducer.playgroundId === res[1] ? setDefaultCourt(true) : null;
    });
  }, []);

  const makeDefault = (name, id, lat, lon, image, description, phone, type, surface, distance,city) => {
    Alert.alert(
      `${name} selected.`,
      `Do you want to make ${name} your default court?`,
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            try {
              AsyncStorage.setItem(
                "defaultCourt",
                JSON.stringify([name, id, lat, lon, image, description, phone, type, surface, distance, city])
              );
              setDefaultCourt(true);
            } catch (e) {
              console.log("something wrong (storage)");
            }

            alert(`Nice! ${name} is your new default court.`);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const openMaps = (latitude, longitude) => {
    const daddr = `${latitude},${longitude}`;
    const company = Platform.OS === "ios" ? "apple" : "google";
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
  };

  const openCall = (number) => {
    Linking.openURL(`tel://${number}`);
  };

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

        <Right>
          <Button
            rounded
            style={
              defaultCourt
                ? { backgroundColor: "green" }
                : { backgroundColor: "rgba(212, 190, 190, 0.85)" }
            }
            onPress={() =>
              defaultCourt
                ? alert("This is your default court.")
                : makeDefault(
                    props.reducer.playgroundName,
                    props.reducer.playgroundId,
                    props.reducer.playgroundLat,
                    props.reducer.playgroundLon,
                    props.reducer.playgroundImage,
                    props.reducer.playgroundDescription,
                    props.reducer.playgroundPhone,
                    props.reducer.playgroundType,
                    props.reducer.playgroundSurface,
                    props.reducer.playgroundDistance,
                    props.reducer.playgroundCity
                  )
            }
          >
            <Text
              style={defaultCourt ? { color: "white" } : { color: "black" }}
            >
              {defaultCourt ? "Default" : "Make Default"}
            </Text>
          </Button>
        </Right>
      </View>
      <ImageBackground
        source={{ uri: `${global.x}` + "/" + props.playgroundImage }}
        style={{ width: "100%", height: "100%", zIndex: 1 }}
      ></ImageBackground>

      <View
        style={{
          position: "absolute",
          bottom: "3%",
          right: "2%",
          flexDirection: "row",
          zIndex:2
        }}
      >
                 <Button
            rounded
            style={{
              backgroundColor: "rgba(212, 190, 190, 0.85)",
              right: "6%",
              padding:12
            }}
            onPress={() => onShare()}
          >
            <MaterialCommunityIcons name="share-variant" color="blue" size={22} />
            {/* <Text style={{ color: "blue", fontSize: 10 }}>Share</Text> */}
          </Button>
        {props.reducer.playgroundPhone !== "" && (
          <Button
            rounded
            style={{
              backgroundColor: "rgba(212, 190, 190, 0.85)",
              right: "3%",
              padding:12
            }}
            onPress={() => openCall(props.reducer.playgroundPhone)}
          >
<MaterialCommunityIcons name="phone" color="blue" size={22} />
            {/* <Text style={{ color: "blue", fontSize: 10 }}>Call</Text> */}
          </Button>
        )}

        <Button
          rounded
          style={{ backgroundColor: "rgba(212, 190, 190, 0.85)", padding: 12 }}
          onPress={() =>
            openMaps(props.reducer.playgroundLat, props.reducer.playgroundLon)
          }
        >
          <MaterialCommunityIcons name="google-maps" color="blue" size={22} />
          {/* <Text style={{ color: "blue", fontSize: 10 }}>Directions</Text> */}
        </Button>
      </View>
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
    //backgroundColor: "transparent",

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
