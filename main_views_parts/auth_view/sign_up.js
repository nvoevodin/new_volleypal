import React, { useState } from "react";
import { StyleSheet, Text, KeyboardAvoidingView, Alert } from "react-native";
import { Container, Form, Input, Item, Button, Label } from "native-base";
import { addUser } from "./functions/signUpFunc";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const SignUp = (props) => {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (email, password) => {
    if (password.length < 6) {
      alert("Must be minimum 6 characters!");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(() => firebase.auth().currentUser.sendEmailVerification())
      .then(() => {
        addUser(
          firebase.auth().currentUser.uid,

          firstName,
          lastName,
          email
        );
        Alert.alert(
          "SUCCESS!",
          "We just emailed you a verification link. It might take a few minutes to arrive into your mailbox. It might go into your spam sometimes.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Courts");
              },
            },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Alert.alert("Access Denied!", `${error.message}`, [{ text: "OK" }], {
          cancelable: false,
        });
      });
  };

  return (
    <Container style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Form>
          {/* DISPLAYS ERROR IF EXISTS */}
          {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}

          {/* INPUTS */}
          <Item floatingLabel>
            <Label>First Name</Label>
            <Input
              autoCorrect={false}
              onChangeText={(firstName) => setFirstName(firstName.trim())}
            />
          </Item>

          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input
              secureTextEntry={false}
              autoCorrect={false}
              onChangeText={(lastName) => setLastName(lastName.trim())}
            />
          </Item>

          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email.trim())}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => setPassword(password.trim())}
            />
          </Item>

          {(!password || !email || !firstName || !lastName) && (
            <Text
              style={{
                color: "red",
                width: "50%",
                marginLeft: "30%",
                marginTop: "5%",
              }}
            >
              All Fields Are Required!
            </Text>
          )}

          <Button
            style={{ margin: 10, marginTop: 40 }}
            full
            rounded
            success
            disabled={!password || !email || !firstName || !lastName}
            onPress={() => handleSignUp(email, password)}
          >
            <Text style={{ color: "white" }}>Register</Text>
          </Button>
        </Form>
      </KeyboardAvoidingView>
      {/* {this.state.forgotPasswordModalVisible && ( 
    <ForgotPassword 
    modalVisible = {this.state.forgotPasswordModalVisible}
    showModal = {this.showForgotPasswordModal}
    
    />)}
                {this.state.resendEmailModalVisible && ( 
    <ResendEmail 
    modalVisible = {this.state.resendEmailModalVisible}
    showModal = {this.showResendEmailModal}
    
    />)} */}
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
      dispatch({
        type: "STORE_USER_ID",
        value: id,
        value1: fname,
        value2: sname,
        value3: email,
      }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 40,
  },
});
