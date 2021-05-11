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

    </ScrollView>
  );
};

export default PreCheckInList;
