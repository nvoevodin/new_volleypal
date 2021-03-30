import React, {useState, useEffect} from 'react';
import {StyleSheet,ScrollView, TouchableOpacity, Alert,ActivityIndicator, View} from 'react-native';
import { Left, ListItem, Text, Separator,Button} from 'native-base';
import { connect } from 'react-redux';
import PreCheckModal from './precheck_modal'
import WeatherView from './weatherView'

import {checkIn} from './functions/checkInFunction'
import {checkedInCheck} from './functions/checkInCheckFunction'
import {preCheckedInCheck} from './functions/preCheckCheckFunction'
//import {cancelPrecheck} from './functions/cancelPrecheck'

import { useNavigation } from '@react-navigation/native';
const MainList =(props)=> {

  const navigation = useNavigation();

  const [checkedIn, setCheckedIn] = useState(false)
  const [preChecked, setPreChecked] = useState(false)
  const [submittedAnimation, setSubmittedAnimation] = useState(false)

  
  useEffect(() => {
    (async () => {
    var checkedStatus = await checkedInCheck(props.reducer.userInfo[0],props.reducer.playgroundId)
    setCheckedIn(checkedStatus)

    var preCheckedStatus = await preCheckedInCheck(props.reducer.userInfo[0],props.reducer.playgroundId)
    setPreChecked(preCheckedStatus)
  })();
  }, []);
  

const checkInInfo = () => {

  Alert.alert(
    `Check In Info.`,
    `Check in to show others that you are at the courts. You will be able to see yourself and others who checked in in the Players tab.`,
    [
      { text: "Got it", onPress: () => {

      } }
    ],
    { cancelable: false }
  );
  

}

const preCheckInInfo = () => {

  Alert.alert(
    `Pre-Check In Info.`,
    `You can pre-check in to let others the time that you will be at the courts. Just like with check ins, you will be able to see yourself and others who pre-checked in in the Players tab.`,
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


  const checkInFunc = async () => {
setSubmittedAnimation(true)
    var data = await checkIn( 
       
      props.reducer.playgroundId,
      props.reducer.anonymous,
      props.reducer.userInfo[1],
      props.reducer.userInfo[2],
      props.reducer.userInfo[0], 
      props.reducer.playgroundLat,
      props.reducer.playgroundLon,
      checkedIn)

      setCheckedIn(data)
      setSubmittedAnimation(false)

      

  }


  const cancelPrecheck = (playgroundId, uid) => {
    Alert.alert(
        "Cancel Your Pre-CheckIn?",
        "",
        [
          {
            text: "Cancel",
            onPress: () => {
            },
            style: "cancel"
          },
          {
            text: "OK", onPress: async () => {
              setSubmittedAnimation(true)
               fetch(
                // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
                `${global.x}/cancelPreCheck?site_id=${playgroundId}&user_id=${uid}`,
                { method: "DELETE" }
              ).then(
                setPreChecked(false),
                alert('You canceled your pre-check.'),
                setSubmittedAnimation(false) 
              ).catch((error) => {
                console.log(error)
              })
        
            }
          }
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
                style = {{backgroundColor:checkedIn?'red':'green'}}
                onPress = {() => checkInFunc()
                }
                
                >
                <Text>{checkedIn?'Check Out':'Check In'}</Text>
                </Button>
                </Left>
                <TouchableOpacity onPress = {()=>checkInInfo()}>
                <Text>Info</Text>
                </TouchableOpacity>
              
            
          </ListItem>
          <ListItem last>
          <Left>
            <Button 
            style = {{backgroundColor:preChecked?'red':'green'}}
            onPress = {()=>preChecked?cancelPrecheck(props.reducer.playgroundId,props.reducer.userInfo[0]):props.toggle_timer_modal(true)}>
            <Text>{preChecked?'Cancel Pre-Check':'Pre-Check In'}</Text>
              </Button>
              </Left>
              <TouchableOpacity onPress = {()=>preCheckInInfo()}>
                <Text>Info</Text>
                </TouchableOpacity>
          </ListItem>
          <WeatherView/>
          <Button style = {{margin: '5%'}}
          full
          rounded
          primary
          onPress={()=>navigation.navigate('AddEventView')}>
            <Text>Create Event</Text>
          </Button>

          {submittedAnimation && (
            <View style={styles.loading}>
              <ActivityIndicator
                animating={submittedAnimation}
                style={{ left: "0.5%", bottom: "40%" }}
                size="large"
                color="white"
              />
            </View>
          )}
<PreCheckModal passToPreCheck = {passToPreCheck}/>
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
    toggle_timer_modal: (x) => dispatch({ type: "TOGGLE_TIMER_MODAL", value: x}),
    cancelPreCheck: () => dispatch({ type: "TOGGLE_PRECHECK", value: false }),
    
  };
};

export default connect(mapStateToProps,
  mapDispachToProps
  )(MainList)



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
  });