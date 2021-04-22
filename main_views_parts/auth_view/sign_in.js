import React, { useState } from "react";
import { StyleSheet, Text, KeyboardAvoidingView, Alert } from "react-native";
import { Container, Form, Input, Item, Button, Label } from "native-base";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import ForgotPassword from "./forgotPassword";
import ResendEmail from "./resendEmail";

const SignIn = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(
    false
  );
  const [resendEmailModalVisible, setResendEmailModalVisible] = useState(false);

  const resendEmailIfLogged = () => {
    if (
      new Date().getTime() -
        moment(firebase.auth().currentUser.metadata.creationTime).valueOf() >
      600000
    ) {
      firebase.auth().currentUser.sendEmailVerification();
      alert(
        "We sent a new verification link to the email that you specified. It should be there within the next 15 minutes. If you do not receive the link in the next few hours, email us at volleypalapp@gmail.com. Include your email address so we can reset it for you."
      );
    } else {
      alert(
        "Wait for at least 10 minutes before requesting anothere verification email. Check your spam folder."
      );
    }
  };

  const handleLogin = async (email, password) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .catch((error) => setErrorMessage(error.message));

    AsyncStorage.getItem("user_info", async (error, result) => {
      var res = JSON.parse(result);

      try {
        if (res === null) {
          await fetch(`${global.x}/get_user/${firebase.auth().currentUser.uid}`)
            .then((res) => res.json())
            .then(async (res) => {
              try {
                try {
                  props.storeUserId(
                    res.data[0]["uid"],
                    res.data[0]["first_name"],
                    res.data[0]["last_name"],
                    res.data[0]["email"]
                  );
                } catch (e) {
                  console.log(e);
                }

                await AsyncStorage.setItem(
                  "user_info",
                  JSON.stringify([
                    res.data[0]["uid"],
                    res.data[0]["first_name"],
                    res.data[0]["last_name"],
                    res.data[0]["email"],
                  ])
                );
              } catch (e) {
                console.log("something wrong (storage)");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (res === undefined || res.length == 0) {
          await fetch(`${global.x}/get_user/${firebase.auth().currentUser.uid}`)
            .then((res) => res.json())
            .then(async (res) => {
              try {
                try {
                  props.storeUserId(
                    res.data[0]["uid"],
                    res.data[0]["first_name"],
                    res.data[0]["last_name"],
                    res.data[0]["email"]
                  );
                } catch (e) {
                  console.log(e);
                }

                await AsyncStorage.setItem(
                  "user_info",
                  JSON.stringify([
                    res.data[0]["uid"],
                    res.data[0]["first_name"],
                    res.data[0]["last_name"],
                    res.data[0]["email"],
                  ])
                );
              } catch (e) {
                console.log("something wrong (storage)");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (res[0] !== firebase.auth().currentUser.uid) {
          await fetch(`${global.x}/get_user/${firebase.auth().currentUser.uid}`)
            .then((res) => res.json())
            .then(async (res) => {
              try {
                try {
                  props.storeUserId(
                    res.data[0]["uid"],
                    res.data[0]["first_name"],
                    res.data[0]["last_name"],
                    res.data[0]["email"]
                  );
                } catch (e) {
                  console.log(e);
                }

                await AsyncStorage.setItem(
                  "user_info",
                  JSON.stringify([
                    res.data[0]["uid"],
                    res.data[0]["first_name"],
                    res.data[0]["last_name"],
                    res.data[0]["email"],
                  ])
                );
              } catch (e) {
                console.log("something wrong (storage)");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          await fetch(`${global.x}/get_user/${firebase.auth().currentUser.uid}`)
            .then((res) => res.json())
            .then(async (res) => {
              try {
                props.storeUserId(
                  res.data[0]["uid"],
                  res.data[0]["first_name"],
                  res.data[0]["last_name"],
                  res.data[0]["email"]
                );
              } catch (e) {
                console.log(e);
              }
            });
        }
      } catch (e) {
        console.log(e);
      }
    });

    firebase.auth().currentUser.emailVerified
      ? props.signedIn(true)
      : alert("Verify your email please!");
  };

  return (
    <Container style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Form>
          {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => setPassword(password)}
            />
          </Item>

          <Button
            style={{ margin: 10 }}
            full
            rounded
            success
            onPress={() => {
              //firebase.auth().currentUser['emailVerified']?
              handleLogin(email, password);
              //:alert('Verify your your email first. It should be in your inbox within the next 10 minutes. Check your spam folder as well.')
            }}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </Button>

          <Button
            style={{ margin: 10 }}
            full
            rounded
            primary
            //onPress={this.goBack}
          >
            <Text style={{ color: "white" }}>Go Back</Text>
          </Button>

          <Button
            style={{ margin: 10 }}
            full
            rounded
            danger
            onPress={() =>
              setForgotPasswordModalVisible(!forgotPasswordModalVisible)
            }
          >
            <Text style={{ color: "white" }}>Forgot Password</Text>
          </Button>

          <Button
            style={{ margin: 10 }}
            full
            rounded
            danger
            onPress={() => {
              firebase.auth().currentUser === null
                ? setResendEmailModalVisible(!resendEmailModalVisible)
                : resendEmailIfLogged();
            }}
          >
            <Text style={{ color: "white" }}>Resend Verification Email</Text>
          </Button>
        </Form>
      </KeyboardAvoidingView>
      {forgotPasswordModalVisible && (
        <ForgotPassword
          modalVisible={forgotPasswordModalVisible}
          toggleModal={() =>
            setForgotPasswordModalVisible(!forgotPasswordModalVisible)
          }
        />
      )}
      {resendEmailModalVisible && (
        <ResendEmail
          modalVisible={resendEmailModalVisible}
          toggleModal={() =>
            setResendEmailModalVisible(!resendEmailModalVisible)
          }
        />
      )}
    </Container>
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
  };
};

export default connect(mapStateToProps, mapDispachToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 40,
  },
});
