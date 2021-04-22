import { getDistance } from "geolib";
import * as Location from "expo-location";
//import { useNavigation } from "@react-navigation/native";
import mime from "mime";

const calculateDistance = (start_x, start_y, end_x, end_y, name) => {
  try {
    let distance = getDistance(
      {
        latitude: start_x,
        longitude: start_y,
      },
      {
        latitude: end_x,
        longitude: end_y,
      },
      (accuracy = 10)
    );

    //checkin(distance);

    return { name: name, distance: distance };
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentLoc = async (
  playgrounds,
  name,
  city,
  country,
  address,
  image,
  type,
  surface,
  description,
  phone
) => {
  //const navigation = useNavigation();
  try {
    let location = await Location.getCurrentPositionAsync({});

    location = await JSON.stringify(location);
    location = await eval("(" + "[" + location + "]" + ")");

    const map1 = await playgrounds.map((court) => {
      let distance = calculateDistance(
        court.latitude,
        court.longitude,
        location[0].coords.latitude,
        location[0].coords.longitude,
        court.site_name
      );

      return distance;
    });

    if (map1.some((e) => e["distance"] < 350)) {
      map1.map((e) => {
        if (e["distance"] < 350) {
          alert(
            `This court already exists! Look for ${e["name"]} in the list of courts.`
          );
        }
      });
    } else {
      // Check if any file is selected or not
      if (image != null) {
        // If file selected then create FormData
        const fileToUpload = image;
        const data = new FormData();
        data.append("name", name);
        data.append("city", city);
        data.append("country", country);
        data.append("address", address);
        data.append("phone", phone);
        data.append("type", type);
        data.append("surface", surface);
        data.append("description", description);
        data.append("latitude", location[0].coords.latitude);
        data.append("longitude", location[0].coords.longitude);

        const newImageUri =
          "file:///" + fileToUpload.uri.split("file:/").join("");

        data.append("fileData", {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: "image",
        });

        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: data,
        };
        fetch(`${global.x}/addImage`, config)
          .then((checkStatusAndGetJSONResponse) => {})
          .catch((err) => {
            console.log(err);
          });
      } else {
        // If no file selected the show alert
        alert("Please Select File first");
      }

      //   fetch(
      //     // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
      //     `${global.x}/addPlayground?name=${Name}&city=${City.toLowerCase().trim()}&country=${Country.toLowerCase().trim()}&address=${Address}&latitude=${location[0].coords.latitude}&longitude=${location[0].coords.longitude}`,
      //     { method: "POST" }
      //   ).catch((error) => {
      //     console.log(error)
      //   })
      alert("Playground is successfully added!");
      ///navigation.navigate('AddCourt')
    }
  } catch (e) {
    console.log(e);
    alert("cannot get current location");
  }

  //this.setState({ submittedAnimation: false });
};
