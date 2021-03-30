import React, { useState} from 'react';
import { Octicons } from '@expo/vector-icons';
import {StyleSheet,Modal, TouchableOpacity, Alert, Image,View} from 'react-native';
import {Container, Header, Content, List, ListItem, Icon, Button, Left,Right, Body, Title,Text, Tab, Tabs,TabHeading} from 'native-base';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PotentialCourtsTab = (props) => {
   
  const navigation = useNavigation();


const selectPlayground = async (site_name,site_id,latitude,longitude,image,description) => {
  await props.storeQueuePlayground(site_name,site_id,latitude,longitude,image,description)

  navigation.navigate("QueueCourt")
}

    return(

<Content>
          <List>
          {props.potential_sites.map((object,index) =>

            <ListItem key = {index}>
                        <TouchableOpacity style = {{flexDirection:'row'}}
          onPress = {() => selectPlayground(object["site_name"], 
          object["site_id"], 
          object["latitude"], 
          object["longitude"], 
          object["image"], 
          object["description"])} 
          //onPress={() => {this.selectPlayground(object["site_name"], object["site_id"], object["latitude"], object["longitude"]),  this.props.checkIfChecked(),this.props.checkIfPreChecked()}}
          >
                <Left>
              <Text>{object["site_name"]}</Text>
              </Left>
           
              {/* <Button disabled = {false} style ={{backgroundColor: '#e3e8e6'}} 
            //   onPress={() => {this.confirmCourt(object["site_id"], object["latitude"], object["longitude"])}}
              >
                <Text style = {{color: 'grey'}}>Confirm | {5 - object["confirms"]} left</Text>
                <Icon name='thumbs-up' style={{fontSize: 25, color: 'green'}}/>
            </Button> */}
            <Text style = {{color: 'grey'}}>{5 - object["confirms"]} confirmation(s) left</Text>
         
            </TouchableOpacity>   
            </ListItem>
        
        
          )}
          </List>
        </Content>

    )}

    const mapStateToProps = (state) => {
    
      const { reducer } = state
      return { reducer }
    };
  
    const mapDispachToProps = dispatch => {
      return {
  
        storeQueuePlayground: (name,id,lat,lon,img,description) => dispatch({ type: "STORE_QUEUE_PLAYGROUND", value: [name,id,lat,lon,img,description]})
       
      };
    };
  
    export default connect(mapStateToProps,
      mapDispachToProps
      )(PotentialCourtsTab) 
 