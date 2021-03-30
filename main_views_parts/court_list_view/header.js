import React from "react";
import {View, Alert,Platform, StyleSheet} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as firebase from 'firebase';



const CourtListHeader = (props) =>  {
  const navigation = useNavigation();
  

const signOut = () => {

  Alert.alert(
    "Log Out?",
    "",
    [
      {
        text: "Cancel",
        onPress: () => {
  
        },
        style: "cancel"
      },
      { text: "OK", onPress: async () => {
        props.signedIn(false)
        firebase.auth().signOut()
        .catch(error => console.log(error))
      
  } }
    ],
    { cancelable: false }
  );

}



 

    return (
      <View style = {{height:Platform.OS === 'android'?'8%':null}}>

<Header style = {styles.header}>
<Left>
{props.reducer.signedIn?
<Button transparent onPress={()=>signOut()}>
<MaterialCommunityIcons name="exit-run" color = 'red' size={26}/>
    </Button>:
    <Button transparent onPress={()=>navigation.navigate('Court')}>
    <MaterialCommunityIcons name="login" color = 'green' size={26}/>
    </Button>
    }
  </Left>
  <Body>
    <Title style = {{color:'black'}}>Select Courts</Title>
  </Body>
  {props.reducer.signedIn &&
  <Right>
  
  <Button transparent onPress={()=>navigation.navigate('SettingsView')}>
  <MaterialCommunityIcons name="settings" size={26} color="black" />
    </Button>
  <Button transparent onPress={()=>navigation.navigate('AddCourt')}>
  <Entypo name="plus" size={28} color="black" />
    </Button>

  </Right>
  }
</Header>
</View>
    )}


    const mapStateToProps = (state) => {
    
      const { reducer } = state
      return { reducer }
    };
    
    const mapDispachToProps = dispatch => {
      return {
          signedIn:(x)=>dispatch({type: "STORE_USER_STATUS", value: x}),
        storeUserId: (id,fname,sname,email) => dispatch({ type: "STORE_USER_ID", value: id, value1:fname, value2:sname, value3:email})
    
      };
    };
    
    export default connect(mapStateToProps, mapDispachToProps)(CourtListHeader);


    const styles = StyleSheet.create({
      header: {
        backgroundColor:'#e3e8e6',
        ...Platform.select({
          ios: {
            borderBottomWidth: 0
          },
          android: {
            top:'5%', borderBottomWidth: 0,elevation: 0
          }
    
        })
      }
    });


