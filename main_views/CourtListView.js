import React, { useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
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
      welcomeAlert()
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
            res[6],
            res[7],
            res[8],
            res[9],
            res[10]
          );

          navigation.navigate("Court");
        } catch (e) {
          console.log(e);
        }
      });
    })();
  }, []);


  const welcomeAlert = async () =>{
    try{
      var value = await AsyncStorage.getItem('welcomeAlert')
    } catch(e){
console.log('error')
    }
    
    var val = (value === 'true')
    console.log(val)
if (val === false){

  Alert.alert(
    `Welcome to VolleyPal.`,
    `VolleyPal is an all around service for volleyball players. Check out www.VolleyPal.site page for the detailed app guide. \n
    DISCLOSURE: \n 
    * This app requests location data to enable check in and out at appropriate courts. 
    * We do not collect, store, or share your location data for any other purposes.
    * The app will also request access to your photo library if you decide to add a court.`,
    [

      { text: "Got it", onPress: () => {
  
        try {
          AsyncStorage.setItem('welcomeAlert', "true")
        } catch (e) {
          console.log('something wrong (storage)')
        }
  
        
      } }
    ],
    { cancelable: false }
  );

}

  }


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
    storePlayground: (name, id, lat, lon, img, description, phone, type,surface,distance,city) =>
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
        value11: id,
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
