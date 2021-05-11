import React, { useState } from "react";
import { Octicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  Image,
  View,
  ScrollView
} from "react-native";
import {
  Container,
  Header,
  Content,
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
import * as Playground from "./functions/selectPlayground";
import { useNavigation } from "@react-navigation/native";

const LiveCourtsTab = (props) => {
  const [defaultCourtId, setDefaultCourtId] = useState("");
  const navigation = useNavigation();

  return (
    <ScrollView>
      <List>
        {props.playgrounds && props.playgrounds
          .filter(
            (i) =>
              i["country"] === props.filters[0] &&
              i["city"] === props.filters[1] &&
              i["surface"] === props.filters[2]
          )
          .map((object, index) => (
            <ListItem key={index}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                activeOpacity={1}
                onPress={() =>
                  Playground.selectPlayground(
                    object["site_name"],
                    object["site_id"],
                    object["latitude"],
                    object["longitude"],
                    object["image"],
                    props.storePlayground(
                      object["site_name"],
                      object["site_id"],
                      object["latitude"],
                      object["longitude"],
                      object["image"],
                      object["description"],
                      object["phone"],
                      object["type"],
                      object["surface"],
                      object["distance"],
                      object["city"],
                      props.reducer.playgroundDefault
                    ),
                    navigation.navigate("Court")
                  )
                }
              >
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri:
                      object["image"] === null
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrtJiIcpJ_ojAKvA7awHBtXn8-fCfB3NFDxd2Sz5DGmrh-9IxkNeWVt9ryVZJpdS8-CQ0&usqp=CAU"
                        : `${global.x}` + "/" + object["image"],
                  }}
                />
                {/* <Text>{object["site_name"]}</Text> */}

                <View
                  style={{
                    marginLeft: 10,
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignSelf: "flex-start" }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {object["site_name"]}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ textTransform: "capitalize" }}>
                        {object["city"]}
                      </Text>
                    </View>

                    <View>
                      <Text>{props.filters[0] === 'United States'? Math.round(object["distance"] * 0.62)  + ' mi':object["distance"]+ ' km'}</Text>
                    </View>
                  </View>

                  <View style={{ alignSelf: "flex-start", color: "green" }}>
                    <Text style={{ color: "green" }}>
                      {object["surface"] + " " + "(" + object["type"] + ")"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </ListItem>
          ))}
      </List>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 130,
    height: 105,
    borderRadius: 5,
  },
});

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    storePlayground: (name, id, lat, lon, img, description, phone, type, surface, distance,city, idDefault) =>
      dispatch({
        type: "STORE_PLAYGROUND",
        value: name,
        value1: id,
        value2: lat,
        value3: lon,
        value4: img,
        value5: description,
        value6: phone,
        value7: type,
        value8: surface,
        value9: distance,
        value10: city,
        value11: idDefault,
      }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(LiveCourtsTab);
