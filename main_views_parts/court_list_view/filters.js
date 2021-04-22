import React, { useState, useEffect } from "react";
import { Left, ListItem, Text, Separator, Button } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { getCities } from "./functions/getCities";
import { getCountries } from "./functions/getCountries";
import CountryPicker from "./country_picker";
import CityPicker from "./city_picker";
import TypePicker from "./type_picker";
import { toTitleCase } from "../../helper_functions/functions";

const Filters = (props) => {
  const [pressed, setPressed] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("United States");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("new york");
  const [type, setType] = useState("Beach");

  useEffect(() => {
    (async () => {
      setCountries(await getCountries());
      setCities(await getCities(country));
    })();
  }, [country]);

  const ReceiveCountryFromPicker = (x) => {
    setCountry(x);
  };

  const ReceiveCityFromPicker = (x) => {
    setCity(x);
  };

  const ReceiveTypeFromPicker = (x) => {
    setType(x);
  };

  const filterCourts = () => {
    props.filterCourts([country, city, type]);
  };

  return (
    <>
      <View>
        <ListItem>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => setPressed(!pressed)}>
              <View style={{ flexDirection: "row" }}>
                <Octicons name="settings" size={24} color="black" />

                <Text style={{ marginLeft: 5, fontSize: 13 }}>Filters</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 13 }}>
                {country} | {toTitleCase(city)} | {type}{" "}
              </Text>
            </View>
          </View>
        </ListItem>
      </View>
      {pressed ? (
        <>
          <ListItem>
            <Left>
              <CountryPicker
                countries1={countries}
                SendCountryFromPicker={ReceiveCountryFromPicker}
              />
            </Left>
            <Text>Country</Text>
          </ListItem>
          <ListItem>
            <Left>
              <CityPicker
                cities1={cities}
                SendCityFromPicker={ReceiveCityFromPicker}
              />
            </Left>
            <Text>City</Text>
          </ListItem>
          <ListItem>
            <Left>
              <TypePicker SendTypeFromPicker={ReceiveTypeFromPicker} />
            </Left>
            <Text>Type</Text>
          </ListItem>
          {(type !== "") & (country !== "") & (city !== "") ? (
            <ListItem style={{ justifyContent: "center" }}>
              <Button
                style={{ width: "90%" }}
                full
                rounded
                primary
                onPress={() => filterCourts()}
              >
                <Text>Filter</Text>
              </Button>
            </ListItem>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Filters;
