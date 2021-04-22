import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import CourtList from "../main_views_parts/court_list_view/CourtLIst";
import CourtListHeader from "../main_views_parts/court_list_view/header";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
const CourtListView = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      AsyncStorage.getItem("defaultCourt", async (error, result) => {
        var res = JSON.parse(result);

        try {
          await props.storePlayground(
            res[0],
            res[1],
            res[2],
            res[3],
            res[4],
            res[5],
            res[6]
          );

          navigation.navigate("Court");
        } catch (e) {
          console.log(e);
        }
      });
    })();
  }, []);

  return (
    <React.Fragment>
      <CourtListHeader />
      <CourtList />
      <StatusBar style="auto" />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    storePlayground: (name, id, lat, lon, img, description, phone) =>
      dispatch({
        type: "STORE_PLAYGROUND",
        value: name,
        value1: id,
        value2: lat,
        value3: lon,
        value4: img,
        value5: description,
        value6: phone,
        value7: id,
      }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(CourtListView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
