import React from 'react';
import {ScrollView} from 'react-native';
import { Left, ListItem, Text, Separator,Button } from 'native-base';
import moment from "moment";
const CheckInList =(props)=> {
  
    return (
      <ScrollView>
       
       <Separator bordered>
            <Text>STATUS</Text>
          </Separator>
   
          <ListItem>
          <Left><Text>Checked In</Text></Left>
              <Text>{props.numberOfChecks.length}</Text>
          </ListItem>
 

          <Separator bordered>
            <Text>PLAYERS</Text>
          </Separator>
          {props.numberOfChecks.map((object,index) =>
          <ListItem key = {index}>
            <Left><Text>{object["first_name"].trim()} {object["last_name"].trim()}</Text></Left>
            <Text>{moment.utc(object["pre_checkin_datetime"]).local().format('LT')}</Text>
          </ListItem>)}
          
       
      </ScrollView>
    );
  
}

export default CheckInList