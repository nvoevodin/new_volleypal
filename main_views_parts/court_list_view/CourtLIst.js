import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import {
  Container,
  Header,

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
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import { getPlaygrounds } from "./functions/getCourtsFunc";
import { getPotentialPlaygrounds } from "./functions/getPotentialCourtsFunc";
import LiveCourtsTab from "./liveCourts";
import PotentialCourtsTab from "./potentialCourts";
import Filters from "./filters";
import CourtMap from "./map";

const CourtList = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [playgrounds, setPlaygrounds] = useState([]);
  const [potential_sites, setPotential_sites] = useState([]);
  const [filters, setFilters] = useState([
    "United States",
    "new york",
    "Beach",
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedAnimation, setSubmittedAnimation] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      setSubmittedAnimation(true);
      setPlaygrounds(await getPlaygrounds());

      setPotential_sites(await getPotentialPlaygrounds());
      setSubmittedAnimation(false);
    })();
  }, [props.reducer.courtListTrigger]);

  const filterCourts = (x) => {
    setFilters(x);
  };

  const showModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      <Container>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: "grey" }}>
          <Tab
            tabStyle={{ backgroundColor: "#e3e8e6" }}
            activeTextStyle={{
              color: "grey",
              fontWeight: "bold",
              fontSize: 18,
            }}
            activeTabStyle={{ backgroundColor: "#e3e8e6" }}
            textStyle={{ color: "grey", fontWeight: "normal" }}
            heading="Live Courts"
          >
            <Filters filterCourts={filterCourts} />
            <LiveCourtsTab playgrounds={playgrounds} filters={filters} />
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: "#e3e8e6" }}
            activeTextStyle={{
              color: "grey",
              fontWeight: "bold",
              fontSize: 18,
            }}
            activeTabStyle={{ backgroundColor: "#e3e8e6" }}
            textStyle={{ color: "grey", fontWeight: "normal" }}
            heading="Potential Courts"
          >
            <PotentialCourtsTab potential_sites={potential_sites} />
          </Tab>
        </Tabs>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: "4%",
            bottom: "4%",
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 1, //IOS
            backgroundColor: "#fff",
            elevation: 2, // Android
            alignItems: "center",
            justifyContent: "center",
            width: 75,
            height: 75,
            backgroundColor: "white",
            borderRadius: 50,
          }}
          onPress={() => showModal()}
        >
          <FontAwesome name="map-marker" size={30} color="black" />
        </TouchableOpacity>
      </Container>
      <CourtMap
        playgrounds={playgrounds}
        potential_sites={potential_sites}
        modalVisible={modalVisible}
        showModal={() => showModal()}
      />

      {submittedAnimation && (
        <View style={styles.loading}>
          <ActivityIndicator
            pointerEvents="none"
            animating={submittedAnimation}
            size="large"
            color="white"
          />
        </View>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
   
  };
};

export default connect(mapStateToProps, mapDispachToProps)(CourtList);



const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#666570",
    opacity: 0.8,
  },
});
