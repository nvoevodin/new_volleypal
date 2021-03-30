import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity, Alert,View} from 'react-native';
import { Left, ListItem, Text, Separator,Button} from 'native-base';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDistance } from "geolib";
import * as Location from "expo-location";
import { useNavigation } from '@react-navigation/native';
const MainList =(props)=> {

  const navigation = useNavigation();

  const [confirmed, setConfirmed] = useState(false)

  //const [cancelTrigger, setCancelTrigger] = useState(true)

  useEffect(() => {
    (async () => {
        
      const value = await AsyncStorage.getItem('confirmed')
      {value === props.reducer.queueCourtInfo[1]? setConfirmed(true):null}
  })();
  }, []);

  

const confirmInfo = () => {
  Alert.alert(
    `Court confirmation.`,
    `Confirm that this place really exists and the info on this page is more or less accurate.`,
    [
      { text: "Got it", onPress: () => {

      } }
    ],
    { cancelable: false }
  );

}

const getCurrentLoc = async () => {
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


const calculateDistance = (start_x,start_y, end_x,end_y,name) => {
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
      accuracy = 10
    );
   
    //checkin(distance);
    console.log(distance)
      return {name: name, distance:distance};  
    } catch (error) {
    console.log(error)
  }
}



const confirmCourt = (site, lat, lon) => {

  Alert.alert(
    "Courts Confirmation",
    "By clicking OK, you confirm that these courts (or this court) really exists! Please do not falsly confirm as this ruins the experience for everyone!",
    [
      {
        text: "Cancel",
        onPress: () => {

        },
        style: "cancel"
      },
      { text: "OK", onPress: async () => {
        //console.log(site)

        const value = await AsyncStorage.getItem('confirmed')

                //get location
                let location = await getCurrentLoc();

                //test how far away the user is
                let distance = await calculateDistance(
                  parseFloat(location[0].coords.latitude),
                  parseFloat(location[0].coords.longitude),
                  parseFloat(lat),
                  parseFloat(lon)
                );
                //console.log("distance: ", distance['distance']);

        if(distance['distance'] > 350) {
          alert('Cant confirm! Must be at the location!')

        } else if (value === site){
          
          //console.log(value)
          alert('Can only confirm once!')
        } else {

          await fetch(
            // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
            `${global.x}/confirm_potential_sites?site_id=${site}`,
            { method: "PUT" }
          ).catch((error) => {
            console.log(error)
          })
  
          try {
            await AsyncStorage.setItem('confirmed', site)
          } catch (e) {
            console.log('something wrong (storage)')
          }
  setConfirmed(true)
  alert('Thank you! Your confirmation is recorded.')

        }


} }
    ],
    { cancelable: false }
  );
}


    return (
      <>
      <ScrollView>
       
   
          <Separator bordered>
            <Text>Confirm</Text>
          </Separator>
          <ListItem>
              <Left>
                <Button 
                style = {{backgroundColor:confirmed?'green':'blue'}}
                onPress = {()=>confirmed?alert("Already confirmed!"):confirmCourt(props.reducer.queueCourtInfo[1], props.reducer.queueCourtInfo[2], props.reducer.queueCourtInfo[3])}
                
                
                
                >
                <Text>{confirmed?'Confirmed':'Confirm'}</Text>
                </Button>
                </Left>
                <TouchableOpacity onPress = {()=>confirmInfo()}>
                <Text>Info</Text>
                </TouchableOpacity>
              
            
          </ListItem>
       
            <View style={{flex:1,justifyContent: "center",alignItems: "center", height:200}}>
            <Text>Nothing Here Yet</Text>
            </View>
          
          
         
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

    
  };
};

export default connect(mapStateToProps,
  mapDispachToProps
  )(MainList)