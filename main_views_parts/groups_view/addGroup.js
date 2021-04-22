import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import {
  Container,
  Header,
  CheckBox,
  ListItem,
  Label,
  Icon,
  Button,
  Left,
  Input,
  Body,
  Title,
  Text,
  Form,
  Textarea,
} from "native-base";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const AddGroup = (props) => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [submittedAnimation, SetSubmittedAnimation] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("public");

  const groupStatus = (x) => {
    setStatus(x);
  };

  const question = () => {
    alert(
      "Select one of the three group types. 1) Public Group - anybody can join a public group or see who is in a public group. 2) Private Group - anybody can apply to join a private group, and it is up to the creator of the group to approve or deny access. Outsiders can not see who is in a private group. 3) Hidden Group - an invisible private group. Players can join hidden group only by invite from an admin."
    );
  };

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  const createGroup = async () => {
    await fetch(
      // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
      `${global.x}/addGroup?admin_id=${
        props.reducer.userInfo[0]
      }&playground_id=${
        props.reducer.playgroundId
      }&group_name=${name.trim()}&status=${status}&member=${
        props.reducer.userInfo[0]
      }&waiting=${props.reducer.userInfo[0]}&invited=${
        props.reducer.userInfo[0]
      }`,
      { method: "POST" }
    ).catch((error) => {
      console.log(error);
    });
    //changeState()
    alert("Success! You created a new group.");

    //this.props.closeAddPlaygroundModal()
    //navigate back to groups

    props.createGroupTrigger(!props.reducer.createGroupTrigger);
  };

  return (
    <React.Fragment>
      <Container style={{ top: "3%" }}>
        <Header style={{ backgroundColor: "#e3e8e6", elevation: 0 }}>
          <Left>
            <Button transparent onPress={() => navigation.navigate("Groups")}>
              <Icon name="arrow-back" style={{ color: "black" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "black" }}>Create a Group</Title>
          </Body>
        </Header>
        <ScrollView>
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "#545755",
              marginLeft: "25%",
              marginRight: "25%",
              marginTop: "7%",
            }}
          >
            Please do not create some nonsense group.
          </Text>
          <Form>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                marginTop: "10%",
                marginBottom: "3%",
              }}
            >
              Name
            </Text>

            <Textarea
              underline
              blurOnSubmit={true}
              placeholder="Name the group. Something like: Net Number 1."
              onChangeText={(name) => setName(name)}
            />
            {name < 4 && (
              <Text
                style={{
                  color: "red",
                  width: "80%",
                  textAlign: "center",
                  marginLeft: "10%",
                }}
              >
                Name is too short.
              </Text>
            )}

            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                marginTop: "10%",
                marginBottom: "5%",
              }}
            >
              Group Status
            </Text>
            <View style={{ justiftyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => question()}>
                <AntDesign name="questioncircleo" size={35} color="black" />
              </TouchableOpacity>
            </View>

            <ListItem style={{ marginTop: "3%" }}>
              <Left>
                <TouchableOpacity onPress={() => groupStatus("public")}>
                  <Text>Public Group</Text>
                </TouchableOpacity>
              </Left>
              <Body>
                {status === "public" ? (
                  <AntDesign name="check" size={24} color="green" />
                ) : null}
              </Body>
            </ListItem>
            <ListItem>
              <Left>
                <TouchableOpacity onPress={() => groupStatus("private")}>
                  <Text>Private Group</Text>
                </TouchableOpacity>
              </Left>
              <Body>
                {status === "private" ? (
                  <AntDesign name="check" size={24} color="green" />
                ) : null}
              </Body>
            </ListItem>
            <ListItem>
              <Left>
                <TouchableOpacity onPress={() => groupStatus("hidden")}>
                  <Text>Hidden Group</Text>
                </TouchableOpacity>
              </Left>
              <Body>
                {status === "hidden" ? (
                  <AntDesign name="check" size={24} color="green" />
                ) : null}
              </Body>
            </ListItem>

            {/* <View style = {{flexDirection:'row'}}>
    
<Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={this.state.isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={this.toggleSwitch}
        value={this.state.isEnabled}
       />
 <Text>Toggle to add password.</Text>
       </View>
       {this.state.isEnabled && 
    <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              
              onChangeText={(password) => this.setState({ password })}
              
            />
          </Item> }

      

          
         
       { (this.state.isEnabled && this.state.password.length < 4 )  && 
          <Text style = {{color:'red', width: '80%', marginLeft: '10%', marginTop: '2%'}}>Can be simple, but at least 4 characters.</Text>
          }  */}

            {/* <Text style = {{textAlign:'center',fontSize:20, marginTop:'10%', marginBottom:'3%'}}>Address</Text>

<Textarea underline blurOnSubmit={true} placeholder='Use the closest known address to the playground. Ex.: Central Park West, New York, NY 10019'
onChangeText={(Address) => this.setState({ Address })}
/> */}
          </Form>

          <Button
            style={{ margin: 10, marginTop: 50, marginBottom: 40 }}
            disabled={name < 4 ? true : false}
            full
            rounded
            success
            onPress={() => createGroup()}
          >
            <Text style={{ color: "white" }}>Create</Text>
          </Button>
        </ScrollView>
      </Container>

      {submittedAnimation && (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={submittedAnimation}
            style={{ left: "0.5%", bottom: "40%" }}
            size="large"
            color="white"
          />
        </View>
      )}

      <StatusBar style="auto" />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
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
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 25,
  },
});

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    createGroupTrigger: (x) =>
      dispatch({ type: "CREATE_GROUP_TRIGGER", value: x }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(AddGroup);
