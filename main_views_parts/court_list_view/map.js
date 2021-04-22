import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

const CourtMap = (props) => {
  const [defaultCourt, setDefaultCourt] = useState([
    "Brighton Beach 1",
    "V0000001",
    "New York",
    40.5745,
    -73.9671,
    "uploads/user-1610476434181.jpeg",
    "Test",
    0,
    "Public",
    "Beach",
    "",
    5,
  ]);
  const navigation = useNavigation();

  const storePlaygroundFunction = () => {
    if (defaultCourt[11] > 3) {
      props.storePlayground(
        defaultCourt[0],
        defaultCourt[1],
        defaultCourt[3],
        defaultCourt[4],
        defaultCourt[5],
        defaultCourt[6],
        defaultCourt[10],
        props.reducer.playgroundDefault
      ),
        props.showModal(),
        navigation.navigate("Court");
    } else {
      props.storeQueuePlayground(
        defaultCourt[0],
        defaultCourt[1],
        defaultCourt[3],
        defaultCourt[4],
        defaultCourt[5],
        defaultCourt[6]
      );
      props.showModal(),
        props.reducer.signedIn
          ? navigation.navigate("QueueCourt")
          : navigation.navigate("Court");
    }
  };

  const selectPotentialPlayground = async (
    site_name,
    site_id,
    latitude,
    longitude,
    image,
    description
  ) => {
    await props.storeQueuePlayground(
      site_name,
      site_id,
      latitude,
      longitude,
      image,
      description
    );

    navigation.navigate("QueueCourt");
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
      onRequestClose={() => {
        alert("Modal has been closed.");
      }}
    >
      <View style={styles.container}>
        <MapView
          style={styles.map}
          loadingEnabled={true}
          zoomEnabled={true}
          initialRegion={{
            latitude: 40.601,
            longitude: -73.9643,
            latitudeDelta: 0.18,
            longitudeDelta: 0.18,
          }}
        >
          {props.playgrounds.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.site_name}
              image={
                marker.site_id === defaultCourt[1]
                  ? require("../../assets/volleyPinNavySl.png")
                  : require("../../assets/volleyPinNavyNorm.png")
              }
              //description={marker.description}
              onPress={() =>
                setDefaultCourt([
                  marker.site_name,
                  marker.site_id,
                  marker.city,
                  marker.latitude,
                  marker.longitude,
                  marker.image,
                  marker.description,
                  marker.distance,
                  marker.type,
                  marker.surface,
                  marker.phone,
                  marker.confirms,
                ])
              }
            />
          ))}

          {props.potential_sites.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.site_name}
              image={
                marker.site_id === defaultCourt[1]
                  ? require("../../assets/volleyPinNavySl.png")
                  : require("../../assets/volleyPinNavyNorm.png")
              }
              //description={marker.description}
              onPress={() =>
                setDefaultCourt([
                  marker.site_name,
                  marker.site_id,
                  marker.city,
                  marker.latitude,
                  marker.longitude,
                  marker.image,
                  marker.description,
                  marker.distance,
                  marker.type,
                  marker.surface,
                  marker.phone,
                  marker.confirms,
                ])
              }
            />
          ))}
        </MapView>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: "5%",
            bottom: "23%",

            alignItems: "center",
            justifyContent: "center",
            width: 70,
            height: 70,
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 1, //IOS
            backgroundColor: "#fff",
            elevation: 2, // Android
            borderRadius: 50,
          }}
          onPress={() => props.showModal()}
        >
          <FontAwesome name="list" size={30} color="black" />
        </TouchableOpacity>

        {
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "90%",
              position: "absolute",
              bottom: "3%",
              shadowColor: "rgba(0,0,0, .4)", // IOS
              shadowOffset: { height: 1, width: 1 }, // IOS
              shadowOpacity: 1, // IOS
              shadowRadius: 1, //IOS
              backgroundColor: "#fff",
              elevation: 2, // Android
              borderRadius: 15,
              padding: 13,
            }}
            onPress={() => storePlaygroundFunction()}
            //onPress={() => {this.selectPlayground(object["site_name"], object["site_id"], object["latitude"], object["longitude"]),  this.props.checkIfChecked(),this.props.checkIfPreChecked()}}
          >
            <Image
              style={styles.tinyLogo}
              source={{
                uri:
                  defaultCourt[5] === null
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrtJiIcpJ_ojAKvA7awHBtXn8-fCfB3NFDxd2Sz5DGmrh-9IxkNeWVt9ryVZJpdS8-CQ0&usqp=CAU"
                    : `${global.x}` + "/" + defaultCourt[5],
              }}
            />

            <View
              style={{
                marginLeft: 10,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignSelf: "flex-start" }}>
                <Text style={{ fontWeight: "bold" }}>{defaultCourt[0]}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>{defaultCourt[2]}</Text>
                </View>

                <View>
                  <Text>
                    {defaultCourt[11] < 4
                      ? "Potential Court"
                      : defaultCourt[7] + " km"}
                  </Text>
                </View>
              </View>

              <View style={{ alignSelf: "flex-start", color: "green" }}>
                <Text style={{ color: "green" }}>
                  {defaultCourt[9] + " " + "(" + defaultCourt[8] + ")"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        }
      </View>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    storePlayground: (name, id, lat, lon, img, description, phone, idDefault) =>
      dispatch({
        type: "STORE_PLAYGROUND",
        value: name,
        value1: id,
        value2: lat,
        value3: lon,
        value4: img,
        value5: description,
        value6: phone,
        value7: idDefault,
      }),
    storeQueuePlayground: (name, id, lat, lon, img, description) =>
      dispatch({
        type: "STORE_QUEUE_PLAYGROUND",
        value: [name, id, lat, lon, img, description],
      }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(CourtMap);

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
