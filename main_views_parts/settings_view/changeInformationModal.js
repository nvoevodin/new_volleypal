import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Modal, Text, View } from "react-native";
import { Container, Form, Input, Item, Button, Label } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

const changeInfo = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submittedAnimation, setSubmittedAnimation] = useState(false);

  const updateFName = (firstName) => {
    setFirstName(firstName.trim());
  };

  const updateLName = (lastName) => {
    setLastName(lastName.trim());
  };

  const submitInfo = async (firstName, lastName, uid) => {
    await setSubmittedAnimation(true);
    await fetch(
      // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
      `${global.x}/update_user_info?first_name=${firstName}&last_name=${lastName}&uid=${uid}`,
      { method: "PUT" }
    ).catch((error) => {
      console.log(error);
    });

    try {
      await AsyncStorage.setItem(
        "user_info",
        JSON.stringify([uid, firstName, lastName, props.reducer.userInfo[3]])
      );

      await props.storeUserId(
        uid,
        firstName,
        lastName,
        props.reducer.userInfo[3]
      );
    } catch (e) {
      console.log(e);
    }

    alert("Name changed.");
    setSubmittedAnimation(false);
    props.showModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
      onRequestClose={() => {
        alert("Modal has been closed.");
      }}
    >
      <Container style={styles.container}>
        <Form>
          <Text style={{ padding: 10, fontSize: 17 }}>
            You can change the following information:
          </Text>

          <Item floatingLabel>
            <Label>Fist Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(firstName) => updateFName(firstName)}
              value={firstName}
            />
          </Item>

          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(lastName) => updateLName(lastName)}
              value={lastName}
            />
          </Item>

          <Button
            style={{ margin: 10 }}
            full
            rounded
            success
            onPress={() =>
              submitInfo(firstName, lastName, props.reducer.userInfo[0])
            }
          >
            <Text style={{ color: "white" }}>Submit</Text>
          </Button>

          <Button
            style={{ margin: 10 }}
            full
            rounded
            primary
            onPress={() => props.showModal()}
          >
            <Text style={{ color: "white" }}>Go Back</Text>
          </Button>
        </Form>
      </Container>
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
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    storeUserId: (id, fname, sname, email) =>
      dispatch({ type: "SET_USER_DATA", value: [id, fname, sname, email] }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(changeInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 40,
  },
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
