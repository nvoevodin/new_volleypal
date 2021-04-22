import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  StyleSheet,
  Modal,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import { Button, Text, Form, Textarea } from "native-base";

import CountryPicker from "./country_picker";
import SurfacePicker from "./surface_picker";
import TypePicker from "./type_picker";
import ImageSelector from "./imagePicker";
import { uploadImage } from "./functions/imageSender";
import { useNavigation } from "@react-navigation/native";
import { getPlaygrounds } from "../court_list_view/functions/getCourtsFunc";
import { getCurrentLoc } from "./functions/distanceDecider";

const AddCourtBody = () => {
  const [playgrounds, setPlaygrounds] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Public");
  const [surface, setSurface] = useState("Beach");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("United States");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [submittedAnimation, setSubmittedAnimation] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      setPlaygrounds(await getPlaygrounds());
    })();
  }, []);

  const submitNewCourt = async () => {
    if (
      !name ||
      !description ||
      type === "Cancel" ||
      !city ||
      !address ||
      surface === "Cancel" ||
      !image ||
      country === "Cancel"
    ) {
      alert("Must fill out all required fields!");
    } else {
      setSubmittedAnimation(true);
      await getCurrentLoc(
        playgrounds,
        name,
        city.toLowerCase(),
        country,
        address,
        image,
        type,
        surface,
        description,
        phone
      );
      setSubmittedAnimation(false);
      navigation.navigate("Courts");
    }
  };

  const submitImage = async () => {
    await uploadImage(image, name, city, country, address);
  };

  const ReceiveCountryFromPicker = (x) => {
    setCountry(x);
  };

  const ReceiveTypeFromPicker = (x) => {
    setType(x);
  };

  const ReceiveSurfaceFromPicker = (x) => {
    setSurface(x);
  };

  const selectImage = (x) => {
    setImage(x);
  };

  return (
    <ScrollView>
      <Text
        style={{
          textAlign: "center",
          fontSize: 14,
          color: "#545755",
          marginLeft: "20%",
          marginRight: "20%",
          marginTop: "7%",
        }}
      >
        Please be responsible when adding your playground! Add all requested
        information! You must be at the playground to add it to the list.
      </Text>
      <Form style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: "10%",
            marginBottom: "3%",
          }}
        >
          Name *
        </Text>

        <Textarea
          style={{ backgroundColor: "white", borderWidth: 1 }}
          underline
          blurOnSubmit={true}
          placeholder="Name the playground. Use the most recognized name. Ex.: Central Park Beach Volleyball Playground"
          onChangeText={(Name) => setName(Name)}
        />

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: "10%",
            marginBottom: "3%",
          }}
        >
          Type *
        </Text>

        <TypePicker SendTypeFromPicker={ReceiveTypeFromPicker} />

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: "10%",
            marginBottom: "3%",
          }}
        >
          Surface *
        </Text>
        <SurfacePicker SendSurfaceFromPicker={ReceiveSurfaceFromPicker} />

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: "10%",
            marginBottom: "3%",
          }}
        >
          Country *
        </Text>

        <CountryPicker SendCountryFromPicker={ReceiveCountryFromPicker} />

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: "10%",
            marginBottom: "3%",
          }}
        >
          City *
        </Text>

        <Textarea
          style={{ backgroundColor: "white", borderWidth: 1 }}
          underline
          blurOnSubmit={true}
          placeholder="Enter city here. Use a city, not a neighborhood. Ex.: New York."
          onChangeText={(City) => setCity(City)}
        />

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: "10%",
            marginBottom: "3%",
          }}
        >
          Address (optional)
        </Text>

        <Textarea
          style={{ backgroundColor: "white", borderWidth: 1 }}
          underline
          blurOnSubmit={true}
          placeholder="Use the closest known address to the playground. Ex.: Central Park West, New York, NY 10019"
          onChangeText={(Address) => setAddress(Address)}
        />

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: "10%",
            marginBottom: "3%",
          }}
        >
          Phone (optional)
        </Text>

        <Textarea
          style={{ backgroundColor: "white", borderWidth: 1 }}
          underline
          blurOnSubmit={true}
          placeholder="Format example: +1-000-000-0000"
          onChangeText={(phone) => setPhone(phone)}
        />

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: "10%",
            marginBottom: "3%",
          }}
        >
          Description *
        </Text>

        <Textarea
          style={{ backgroundColor: "white", borderWidth: 1 }}
          underline
          blurOnSubmit={true}
          rowSpan={6}
          placeholder="Write a few sentences here about the courts. Describe things like types of play, levels, number of people and times. Are there nets all the time, and is it beginner friendly? Please, be as descriptive as possible! If you have nothing to say about the courts, let someone else add them."
          onChangeText={(Description) => setDescription(Description)}
        />

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: "10%",
            marginBottom: "3%",
          }}
        >
          Image *
        </Text>

        <ImageSelector selectImage={selectImage} />

        {/* <ImageSelector selectImage = {this.selectImage}/> */}
      </Form>
      <Text
        style={{
          textAlign: "center",
          fontSize: 14,
          color: "#545755",
          marginLeft: "20%",
          marginRight: "20%",
          marginTop: "7%",
        }}
      >
        Once you click 'Submit', the location of the playground will be stored
        in the database. Make sure you are located at the playground before
        submitting!
      </Text>

      <Button
        style={{ margin: 10, marginTop: 80, marginBottom: 80 }}
        full
        rounded
        success
        onPress={() => submitNewCourt()}
      >
        <Text style={{ color: "white" }}>Submit</Text>
      </Button>
      {/* <Button style ={{margin: 10,marginTop:80, marginBottom:80}}
                    full
                    rounded
                    success
                    onPress={()=>{submitImage()}}
                    >

                        <Text style = {{color:'white'}}>upload</Text>
                    </Button> */}

      {/* <Button style ={{margin: 10,marginTop:80, marginBottom:80}}
                    full
                    rounded
                    success
                    onPress={this.uploadImage}
                    >

                        <Text style = {{color:'white'}}>upload</Text>
                    </Button> */}
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
    </ScrollView>
  );
};

export default AddCourtBody;
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
    justifyContent: "center",
    padding: 15,
  },
});
