import React, { useState } from "react";
import { StyleSheet, Modal, Text } from "react-native";
import { Container, Form, Input, Item, Button, Label } from "native-base";
import * as firebase from "firebase";

const forgotPassword = (props) => {
  const [email, setEmail] = useState(null);

  const forgotPassword = (yourEmail) => {
    firebase
      .auth()
      .sendPasswordResetEmail(yourEmail)
      .then(function (user) {
        alert(
          "Your reset link has been sent to your email, make sure to check your spam folder if you do not see it..."
        );
      })
      .catch(function (e) {
        console.log(e);
      });

    props.toggleModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
    >
      <Container style={styles.container}>
        <Form>
          <Text style={{ padding: 10, fontSize: 17 }}>
            Enter your email below to recover your password:
          </Text>

          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
              value={email}
            />
          </Item>

          <Button
            style={{ margin: 10 }}
            full
            rounded
            success
            onPress={() => forgotPassword(email)}
          >
            <Text style={{ color: "white" }}>Reset</Text>
          </Button>

          <Button
            style={{ margin: 10 }}
            full
            rounded
            primary
            onPress={() => props.toggleModal()}
          >
            <Text style={{ color: "white" }}>Go Back</Text>
          </Button>
        </Form>
      </Container>
    </Modal>
  );
};

export default forgotPassword;
//onPress={this.forgotPassword(this.state.email)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 40,
  },
});
