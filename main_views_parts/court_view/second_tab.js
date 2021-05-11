import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Alert, View, ActivityIndicator,StyleSheet } from "react-native";
import { Left, ListItem, Text, Separator, Button, List } from "native-base";
import { connect } from "react-redux";
import { getEvents, deleteEvent } from "./functions/getEventsFunction";
const moment = require("moment");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EventsTab = (props) => {
  const navigation = useNavigation();

  const [events, setEvents] = useState([""]);

  //const [preChecked, setPreChecked] = useState(false)
  const [trigger, setTrigger] = useState(true);
  const [submittedAnimation, setSubmittedAnimation] = useState(false);
  useEffect(() => {
    (async () => {
      setSubmittedAnimation(true);
      const gettingEvents = await getEvents(props.reducer.playgroundId);

      setEvents(gettingEvents);
      setSubmittedAnimation(false);
    })();
  }, [trigger]);
console.log(events)
  const deleteEventFunc = (x) => {
    deleteEvent(x);
    setTrigger(!trigger);
    alert("Event deleted!");
  };

  const refreshEvents = async () => {
    setSubmittedAnimation(true);
    new Date().getTime() - props.reducer.lastEventsRefresh > 60000 ?
    (await props.storeLastEventsRefresh(moment().valueOf()), setTrigger(!trigger)) :
    alert('Wait a minute before refreshing again!')
    setSubmittedAnimation(false);
  }

  return (
    <>
      <ScrollView>
      <Button onPress = {()=> refreshEvents()} rounded style = {{alignSelf:'center', margin:8, padding: 8, backgroundColor:"#e3e8e6"}}>
              <MaterialCommunityIcons name="refresh" color="grey" size={30} />
            </Button>
        {events && events.map((i, index) => (
          <List key={index}>
            <Separator bordered>
              <Text>{moment(i["date"]).utc().format("ll")}</Text>
            </Separator>

            {i["list"] &&
              JSON.parse(i["list"]).map((x, index) => (
                <ListItem key={index}>
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      props.storeEventInfo(x), navigation.navigate("EventView");
                    }}
                  >
                    <View
                      style={{
                        marginLeft: 10,
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ alignSelf: "flex-start" }}>
                        <Text style={{ fontWeight: "bold" }}>
                          {x["event_name"]}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <Text>{x["type"]}</Text>
                        </View>

                        <View>
                          <Text>
                            {moment.utc(x["time"]).local().format("LT")}
                          </Text>
                        </View>
                        {x["admin_id"] === props.reducer.userInfo[0] && (
                          <TouchableOpacity
                            onPress={() => deleteEventFunc(x["id"])}
                          >
                            <View>
                              <Text
                                style={{ fontWeight: "bold", color: "red" }}
                              >
                                Delete
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </ListItem>
              ))}
          </List>
        ))}
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
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    storeEventInfo: (x) => dispatch({ type: "STORE_EVENT_INFO", value: x }),
    storeLastEventsRefresh: (time) => dispatch({ type: "STORE_LAST_EVENTS_REFRESH", value: time }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(EventsTab);

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
