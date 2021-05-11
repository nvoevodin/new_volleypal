import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
import * as Font from "expo-font";
import { connect } from "react-redux";

const WelcomeScreen = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      });

      setTimeout(() => {
        setUser();
      }, 4000)
      
    })();
  }, []);

  const setUser = () => {
    AsyncStorage.getItem("user_info", async (error, result) => {
      var res = JSON.parse(result);

      try {
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            if (user.emailVerified == true && res !== null) {
              var value = await AsyncStorage.getItem("anonymous");
              var val = value === "true";

              try {
                props.setAnonymous(val);
              } catch (e) {}

              props.storeUserId(res[0], res[1], res[2], res[3]);

              props.signedIn(true);
            } else {
              props.signedIn(false);
            }
          }
        });

        navigation.navigate("Courts");
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <>
    <Animatable.View animation="bounceInDown" style={styles.container1}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 120, height: 190 }}
      />

      <Text style={{ fontSize: 43, fontWeight: "bold" }}>VolleyPal</Text>
    </Animatable.View>
        <Animatable.View animation="bounceInUp" style={styles.container1}>
    
        <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: '55%' }}>brought to you by</Text>
        <Text style={{ fontSize: 25, fontWeight: "bold", color:'green', marginTop:'5%' }}>Nikita Voevodin</Text>
      </Animatable.View>
      </>
  );
};

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    signedIn: (x) => dispatch({ type: "STORE_USER_STATUS", value: x }),
    storeUserId: (id, fname, sname, email) =>
      dispatch({ type: "SET_USER_DATA", value: [id, fname, sname, email] }),
    setAnonymous: (x) => dispatch({ type: "SET_ANONYMOUS", value: x }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(WelcomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",

    paddingTop: 10,

    paddingRight: 40,
    paddingLeft: 40,
    marginTop: 40,
  },
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 80,
  },
  container3: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  tinyLogo: {
    width: "40%",
    height: "22%",
  },
});
