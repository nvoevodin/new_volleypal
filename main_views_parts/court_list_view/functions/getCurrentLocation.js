import * as Location from "expo-location";

export const getCurrentLoc = async () => {
  try {
    let location = await Location.getCurrentPositionAsync({});
    location = await JSON.stringify(location);
    location = await eval("(" + "[" + location + "]" + ")");
    //location && console.log(location[0].coords.latitude);
    return location;
  } catch (e) {
    Alert.alert("cannot get current location, try again or ask for help");
  }
};
