import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import GroupHeader from "../main_views_parts/group_view/header";
import GroupTabs from "../main_views_parts/group_view/slidingMenus";

const GroupView = (props) => {
  const navigation = useNavigation();

  return (
    <React.Fragment>
      <GroupHeader title={props.reducer.groupInfo[0]} />

      <View style={styles.container}>
        <GroupTabs
          groupId={props.reducer.groupInfo[1]}
          adminId={props.reducer.groupInfo[2]}
        />
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

export default connect(mapStateToProps, mapDispachToProps)(GroupView);
