import React, { useState, useEffect } from "react";
import { Left, ListItem, Text, Separator } from "native-base";
import { TouchableOpacity, Alert, View } from "react-native";
import { connect } from "react-redux";
const moment = require("moment");

const WeatherView = (props) => {
  const [temperature, setTemperature] = useState(0);
  const [conditions, setConditions] = useState("Unknown");
  const [wind, setWind] = useState("Unknown");
  const [lastUpdated, setLastUpdated] = useState("Unknown");
  const [overall, setOverall] = useState("Unknown");

  useEffect(() => {
    (async () => {
      fetch(`${global.x}/pullTemperature/${props.reducer.playgroundId}`)
        .then((res) => res.json())
        .then(async (res) => {
          const weather = await res.data[0]["weather"].split(",");

          setTemperature(parseFloat(weather[0]));
          setConditions(weather[1]);
          setWind(parseFloat(weather[2]));
          setLastUpdated(res.data[0]["weather_datetime"]);
          //console.log(JSON.parse("[" + res.data[0]["weather"] + "]"))

          {
            weather !== null
              ? new Date().getTime() -
                  moment(res.data[0]["weather_datetime"]).valueOf() >
                3560000
                ? updateWeather()
                : null
              : updateWeather();
          }

          //console.log(parseFloat(weather[0]) > 95 || parseFloat(weather[0]) < 40 || weather[1] !== 'Clear' && weather[1] !== 'Clouds' || parseFloat(weather[2]) > 14)
          try {
            if (
              parseFloat(weather[0]) > 95 ||
              parseFloat(weather[0]) < 40 ||
              (weather[1] !== "Clear" && weather[1] !== "Clouds") ||
              parseFloat(weather[2]) > 14
            ) {
              //this.props.setWeather('Bad')
              setOverall("Bad");
            } else if (
              parseFloat(weather[0]) <= 95 &&
              parseFloat(weather[0]) >= 60 &&
              (weather[1] === "Clear" || weather[1] === "Clouds") &&
              parseFloat(weather[2]) < 7
            ) {
              //this.props.setWeather('Perfect')
              setOverall("Perfect");
            } else if (
              parseFloat(weather[2]) < 11 &&
              parseFloat(weather[0]) <= 95 &&
              parseFloat(weather[0]) >= 50
            ) {
              //this.props.setWeather('Good')
              setOverall("Good");
            } else if (
              parseFloat(weather[2]) <= 14 &&
              parseFloat(weather[0]) >= 40
            ) {
              //this.props.setWeather('Acceptable')
              setOverall("Acceptable");
            }
          } catch (e) {
            console.log("error, no overall");
          }

          //this.setState({players:res.data})
        })
        .catch((error) => {
          //this.setState({temperature:0, conditions: '', wind: 0, lastUpdated:null, overall:''})
          updateWeather();
          console.log("error, initializing");
        });
    })();
  }, []);

  const updateWeather = async () => {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${props.reducer.playgroundLat}&lon=${props.reducer.playgroundLon}&units=imperial&appid=e9eca7a76db49a5c816dde3e666730db`
    )
      .then((res) => res.json())
      .then((res) => {
        setTemperature(res["main"]["temp"]);
        setConditions(res["weather"][0]["main"]);
        setWind(res["wind"]["speed"]);
        setLastUpdated(moment());

        try {
          if (
            parseFloat(res["main"]["temp"]) > 95 ||
            parseFloat(res["main"]["temp"]) < 40 ||
            (res["weather"][0]["main"] !== "Clear" &&
              res["weather"][0]["main"] !== "Clouds") ||
            parseFloat(res["wind"]["speed"]) > 14
          ) {
            //this.props.setWeather('Bad')
            setOverall("Bad");
          } else if (
            parseFloat(res["main"]["temp"]) <= 95 &&
            parseFloat(res["main"]["temp"]) >= 60 &&
            (res["weather"][0]["main"] === "Clear" ||
              res["weather"][0]["main"] === "Clouds") &&
            parseFloat(res["wind"]["speed"]) < 7
          ) {
            //this.props.setWeather('Perfect')
            setOverall("Perfect");
          } else if (
            parseFloat(res["wind"]["speed"]) < 11 &&
            parseFloat(res["main"]["temp"]) <= 95 &&
            parseFloat(res["main"]["temp"]) >= 50
          ) {
            //this.props.setWeather('Good')
            setOverall("Good");
          } else if (
            parseFloat(res["wind"]["speed"]) <= 14 &&
            parseFloat(res["main"]["temp"]) >= 40
          ) {
            //this.props.setWeather('Acceptable')
            setOverall("Acceptable");
          }
        } catch (e) {
          console.log("error, no overall in update weather");
        }

        fetch(
          // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
          `${global.x}/addTemperature?playground_id=${
            props.reducer.playgroundId
          }&weather=${[
            res["main"]["temp"],
            res["weather"][0]["main"],
            res["wind"]["speed"],
          ]}&weather_datetime=${
            moment().utc().format("YYYY-MM-DD HH:mm:ss").substr(0, 18) + "0"
          }`,
          { method: "POST" }
        ).catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <Separator bordered>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>WEATHER</Text>
          <TouchableOpacity
            onPress={() => {
              new Date().getTime() - moment(lastUpdated).valueOf() > 3560000
                ? updateWeather()
                : alert("too soon");
            }}
          >
            <Text style={{ marginRight: "4%" }}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </Separator>
      <ListItem
        noIndent
        style={{
          backgroundColor:
            overall === "Acceptable"
              ? "rgba(8, 171, 253, 0.47)"
              : overall === "Good"
              ? "rgba(85, 253, 8, 0.47)"
              : overall === "Bad"
              ? "rgba(253, 8, 8, 0.47)"
              : "rgba(2, 197, 38, 0.6)",
        }}
      >
        <Left>
          <Text>Overall</Text>
        </Left>
        <Text>{overall}</Text>
      </ListItem>
      <ListItem noIndent>
        <Left>
          <Text>Temperature</Text>
        </Left>
        <Text>{Math.round(temperature)}/{Math.round((temperature-32) * 5/9)} F/C</Text>
      </ListItem>
      <ListItem noIndent>
        <Left>
          <Text>Conditions</Text>
        </Left>
        <Text>{conditions}</Text>
      </ListItem>
      <ListItem noIndent>
        <Left>
          <Text>Wind</Text>
        </Left>
        <Text>{Math.round(wind)}/{Math.round(wind * 1.6)} mi/km</Text>
      </ListItem>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { reducer } = state;
  return { reducer };
};

const mapDispachToProps = (dispatch) => {
  return {
    //toggle_timer_modal: () => dispatch({ type: "TOGGLE_TIMER_MODAL", value: true}),
    //cancelPreCheck: () => dispatch({ type: "TOGGLE_PRECHECK", value: false }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(WeatherView);
