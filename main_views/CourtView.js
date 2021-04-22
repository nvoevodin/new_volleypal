import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { connect } from "react-redux";

import HomeHeader from "../main_views_parts/court_view/header";
import HomeAccordion from "../main_views_parts/court_view/accordion";
import HomeTabs from "../main_views_parts/court_view/slidingMenus";
const CourtView = (props) => {
  return (
    <React.Fragment>
      <HomeHeader playgroundImage={props.reducer.playgroundImage} />
      <HomeAccordion
        playground={[
          {
            title: props.reducer.playgroundName,
            content: props.reducer.playgroundDescription,
          },
        ]}
      />
      <View style={styles.container}>
        <HomeTabs />
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

export default connect(mapStateToProps, mapDispachToProps)(CourtView);
