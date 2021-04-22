import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import PlayersHeader from "../main_views_parts/players_view/header";
import PlayersTabs from "../main_views_parts/players_view/slidingMenus";

const PlayersView = (props) => {
  const navigation = useNavigation();

  return (
    <React.Fragment>
      <PlayersHeader playgroundImage={props.reducer.playgroundImage} />

      <View style={styles.container}>
        <PlayersTabs />
      </View>

      <StatusBar style="auto" />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    //backgroundColor: 'pink',
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    //storePlayground: (name,id,lat,lon) => dispatch({ type: "STORE_PLAYGROUND", value: name,value1: id, value2:lat,value3:lon})
  };
};

export default connect(mapStateToProps, mapDispachToProps)(PlayersView);
