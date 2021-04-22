import React from "react";
import { ScrollView } from "react-native";
import { Left, ListItem, Text, Separator, Button } from "native-base";
import moment from "moment";
const PreCheckInList = (props) => {
  return (
    <ScrollView>
      <Separator bordered>
        <Text>STATUS</Text>
      </Separator>

      <ListItem>
        <Left>
          <Text>Coming to play</Text>
        </Left>
        <Text>{props.numberOfPreChecks.length}</Text>
      </ListItem>

      <Separator bordered>
        <Text>PLAYERS</Text>
      </Separator>
      {props.numberOfPreChecks.map((object, index) => (
        <ListItem key={index}>
          {/* {console.log(moment.utc(object["pre_checkin_datetime"]).format('LT'))} */}
          <Left>
            <Text>
              {object["first_name"].trim()} {object["last_name"].trim()}
            </Text>
          </Left>
          <Text>
            {moment.utc(object["pre_checkin_datetime"]).local().format("LT")}
          </Text>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default PreCheckInList;
