import React, {useState, useEffect} from "react";
import {ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, ListItem, Textarea} from 'native-base';
import TypePicker from './type_picker'
import ModePicker from './mode_picker'
import { connect } from 'react-redux';
import EventTimeModal from './eventTimeModal'
import EventDateModal from './eventDateModal'
const moment = require("moment");
const AddEventBody = (props) =>  {

    const [type, setType] = useState('Game')
    const [mode, setMode] = useState('Public')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
console.log(props.reducer.eventDate)
console.log(props.reducer.eventTime)

    const ReceiveTypeFromPicker = (x) =>{
   
        setType(x)
      }

      const ReceiveModeFromPicker = (x) =>{
   
        setMode(x)
      }

      const createEvent = () => {
 
        if (!props.reducer.eventTime || !props.reducer.eventDate || mode === 'Cancel' || !name || !description || type === 'Cancel'){
          alert('!!!')
        } else {
          fetch(
            // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
            `${global.x}/addEvent?date=${props.reducer.eventDate}&time=${props.reducer.eventTime}&admin_id=${props.reducer.userInfo[0]}&playground_id=${props.reducer.playgroundId}&event_name=${name}&description=${description}&mode=${mode}&type=${type}&member=${props.reducer.userInfo[0]}&waiting=${props.reducer.userInfo[0]}&invited=${props.reducer.userInfo[0]}`,
            { method: "POST" }
          ).catch((error) => {
            console.log(error)
          })
          
          alert(`Success! You event is scheduled for ${moment(props.reducer.eventDate).format('ll')} ${moment(props.reducer.eventTime).format('LT')}.`)
        }

       
      }


 
    return (
      <ScrollView>

<Text
        style={{
          textAlign: "center",
          fontSize: 14,
          color: "#545755",
          marginLeft: "20%",
          marginRight: "20%",
          marginTop: "6%",
        }}
      >
        Here you can create games, training sessions, touranments, and other events. Choose your type, select time, and write a short description.
      </Text>

      <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: "5%",
            marginBottom: "3%",
          }}
        >
          Name *
        </Text>

        <Textarea
        style = {{marginLeft: '3%', marginRight:'3%'}}
          underline
          blurOnSubmit={true}
          rowSpan={1}
          placeholder="Name your event.Ex: 2v2 at 3.15pm"
           onChangeText={(x) => setName( x )}
        />

      <ListItem>
<Left><TypePicker SendTypeFromPicker = {ReceiveTypeFromPicker}/></Left>
<Text>Type</Text>
</ListItem>
<ListItem>
<Left><ModePicker SendModeFromPicker = {ReceiveModeFromPicker}/></Left>
<Text>Mode</Text>
</ListItem>
<ListItem>
<Left><Button
onPress = {props.toggle_eventdate_modal}
><Text>Date</Text></Button></Left>
<Text>Date</Text>
</ListItem>
<ListItem>
<Left><Button
onPress = {props.toggle_eventtime_modal}
><Text>Time</Text></Button></Left>
<Text>Time</Text>
</ListItem>
<Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: "10%",
            marginBottom: "2%",
          }}
        >
          Description *
        </Text>

        <Textarea
        style = {{marginLeft: '3%', marginRight:'3%'}}
          underline
          blurOnSubmit={true}
          rowSpan={6}
          placeholder="Write a few words about your event."
           onChangeText={(x) => setDescription( x )}
        />

<Button style = {{marginTop: '2%',marginBottom: '2%', marginLeft:'5%', marginRight:'5%'}}
          full
          rounded
          success
          onPress={()=>createEvent()}>
            <Text>Submit</Text>
          </Button>
<EventTimeModal/>
<EventDateModal/>
</ScrollView>
    )}



const mapStateToProps = (state) => {
    
    const { reducer } = state
    return { reducer }
  };

  const mapDispachToProps = dispatch => {
    return {
      toggle_eventtime_modal: () => dispatch({ type: "TOGGLE_EVENTTIME_MODAL", value: true}),
      toggle_eventdate_modal: () => dispatch({ type: "TOGGLE_EVENTDATE_MODAL", value: true}),
      //storePreCheck: () => dispatch({ type: "STORE_PRECHECK", value: true})
      
     
    };
  };

  export default connect(mapStateToProps,
    mapDispachToProps
    )(AddEventBody)