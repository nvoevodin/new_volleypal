import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Left, ListItem, Text, Separator,Button} from 'native-base';
import { connect } from 'react-redux';

import onShare from './shareButton'
import {joinEvent,leaveEvent} from './functions/eventFunctions'


import {getMembers} from './functions/eventFunctions'
import { useNavigation } from '@react-navigation/native';


const MainEvent =(props)=> {

  const navigation = useNavigation();

  const [admin, setAdmin] = useState(false)
  const [preChecked, setPreChecked] = useState(false)
  const [joined, setJoined] = useState(false)
 const[members, setMembers] = useState()
 const[trigger, setTrigger] = useState(false)
  //const [cancelTrigger, setCancelTrigger] = useState(true)

  
  useEffect(() => {
    
    (async () => {
      
      const receivedMembers =  await getMembers(props.reducer.eventInfo["id"])
      if (props.id === props.reducer.userInfo[0]) {
        setAdmin(true)
      }

      if(receivedMembers){
        setMembers(receivedMembers)
    
        await receivedMembers.some(i => i["email"] === props.reducer.userInfo[3])?setJoined(true):setJoined(false)
  
       
      
       

      }


  })();
  }, [trigger]);

  
  

  const JoinLeaveInfo = () => {

    Alert.alert(
      `Group basics.`,
      `Join or leave the group here.`,
      [
        { text: "Got it", onPress: () => {
  
        } }
      ],
      { cancelable: false }
    );
    }

    const InviteInfo = () => {

      Alert.alert(
        `Invite a member.`,
        `You can invite other partivipants here. The invitation will send a message through a social media that you choose. The message will ask to download the app to join the event.`,
        [
          { text: "Got it", onPress: () => {
    
          } }
        ],
        { cancelable: false }
      );
      }

  const passToPreCheck = (x) => {
    setPreChecked(x)
  }

  const showInfo = () => {
    Alert.alert(
      `Player's info.`,
      `Coming soon.`,
      [
        { text: "Got it", onPress: () => {
  
        } }
      ],
      { cancelable: false }
    );
  }

  

  
    return (
      <>
      <ScrollView>
       
   
          <Separator bordered>
            <Text>CHECK IN</Text>
          </Separator>
          <ListItem>
              <Left>
                <Button 
                style = {{backgroundColor:joined?'red':'green'}}
                onPress = {async ()=>{
                  joined
                  ?
                  await leaveEvent(props.reducer.eventInfo["id"],props.reducer.userInfo[0])
                  :
                  await joinEvent(props.reducer.eventInfo["id"],props.reducer.userInfo[0]), 
                  admin
                  ?
                  null
                  :
                  setTrigger(!trigger)}}
                >
                <Text>{joined?"Leave":"Join"}</Text>
                </Button>
                </Left>
                <TouchableOpacity onPress = {() => JoinLeaveInfo()}>
                <Text>Info</Text>
                </TouchableOpacity>
              
            
          </ListItem>
          {(joined || admin) &&
            <ListItem>
              <Left>
                <Button 
                style = {{backgroundColor:'blue'}}
                onPress = {async ()=>{onShare()}}
                >
                <Text>Invite</Text>
                </Button>
                </Left>
                <TouchableOpacity onPress = {() => InviteInfo()}>
                <Text>Info</Text>
                </TouchableOpacity>
              
            
          </ListItem>
          }
          
          <Separator bordered>
            <Text>PLAYERS</Text>
          </Separator>
          {
members && members.map((member,index) => 
<ListItem key = {index}>
<Left>
  <Text>{member['first_name'] + ' ' + member['last_name']}</Text>
</Left>
<TouchableOpacity onPress = {async()=>{
  admin?
  await leaveEvent(props.reducer.eventInfo["id"],member['uid']):
  await showInfo(),
  admin
  ?
  setTrigger(!trigger)
  :
  null
  }}>
    {
      admin?null:<Text>{admin?'Remove':'Info'}</Text>
    }

</TouchableOpacity>

</ListItem>

)}
{/* {
props.invited.map((member,index) => 
<ListItem>
<Left>
  <Text>{member}</Text>
</Left>
<Text>Invited</Text>
</ListItem>

)

          } */}
          
         

      </ScrollView>
      
      </>
    );
  
}


const mapStateToProps = (state) => {
    
  const { reducer } = state
  return { reducer }
};

const mapDispachToProps = dispatch => {
  return {
    //toggle_timer_modal: () => dispatch({ type: "TOGGLE_TIMER_MODAL", value: true}),
    //cancelPreCheck: () => dispatch({ type: "TOGGLE_PRECHECK", value: false }),
    
  };
};

export default connect(mapStateToProps,
  mapDispachToProps
  )(MainEvent)