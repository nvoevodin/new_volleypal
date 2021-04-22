import React, { useState, useEffect } from "react";
import { Container, Header, Content, Tab, Tabs } from "native-base";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckInList from "./listCheckIn";
import PreCheckInList from "./listPreCheckIn";
import { getPlayersAndCourts } from "./functions/getPlayersFunc";

import { connect } from "react-redux";
// import Tab1 from './tabOne';
// import Tab2 from './tabTwo';
// import Tab3 from './tabThree';
const PlayersTabs = (props) => {
  const navigation = useNavigation();
  const [numberOfChecks, setNumberOfChecks] = useState([]);
  const [numberOfPreChecks, setNumberOfPreChecks] = useState([]);

  useEffect(() => {
    (async () => {
      var players = await getPlayersAndCourts(props.reducer.playgroundId);
      setNumberOfChecks(players[0]);
      setNumberOfPreChecks(players[1]);
    })();
  }, []);

  return (
    <View>
      <Tabs tabBarUnderlineStyle={{ backgroundColor: "grey" }}>
        <Tab
          tabStyle={{ backgroundColor: "white" }}
          activeTextStyle={{ color: "grey", fontWeight: "bold", fontSize: 16 }}
          activeTabStyle={{ backgroundColor: "white" }}
          textStyle={{ color: "grey", fontWeight: "normal" }}
          heading="Playing Now"
        >
          <CheckInList numberOfChecks={numberOfChecks} />
        </Tab>
        <Tab
          tabStyle={{ backgroundColor: "white" }}
          activeTextStyle={{ color: "grey", fontWeight: "bold", fontSize: 16 }}
          activeTabStyle={{ backgroundColor: "white" }}
          textStyle={{ color: "grey", fontWeight: "normal" }}
          heading="Coming to Play"
        >
          <PreCheckInList numberOfPreChecks={numberOfPreChecks} />
        </Tab>
      </Tabs>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    toggle_timer_modal: () =>
      dispatch({ type: "TOGGLE_TIMER_MODAL", value: true }),
    cancelPreCheck: () => dispatch({ type: "TOGGLE_PRECHECK", value: false }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(PlayersTabs);
