import React from "react";
import {View,Platform, StyleSheet} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as firebase from 'firebase';



const SettingsHeader = (props) =>  {
  const navigation = useNavigation();
  
 

    return (
      <View style = {{height:Platform.OS === 'android'?'8%':null}}>

<Header style = {styles.header}>
<Left>
<Button transparent onPress = {()=>navigation.navigate('Courts')}>
              <Icon name='arrow-back' style = {{color:'black'}}/>
            </Button>
 
  </Left>
  <Body>
    <Title style = {{color:'black'}}>Settings</Title>
  </Body>
  
  <Right>

  </Right>
  
</Header>
</View>
    )}


    const mapStateToProps = (state) => {
    
      const { reducer } = state
      return { reducer }
    };
    
    const mapDispachToProps = dispatch => {
      return {
          //signedIn:(x)=>dispatch({type: "STORE_USER_STATUS", value: x}),
       // storeUserId: (id,fname,sname,email) => dispatch({ type: "STORE_USER_ID", value: id, value1:fname, value2:sname, value3:email})
    
      };
    };
    
    export default connect(mapStateToProps, mapDispachToProps)(SettingsHeader);


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