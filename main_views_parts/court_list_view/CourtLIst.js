import React, { useState, useEffect } from 'react';
import {StyleSheet,Modal, TouchableOpacity, Alert, Image,View} from 'react-native';
import {Container, Header, Content, List, ListItem, Icon, Button, Left,Right, Body, Title,Text, Tab, Tabs,TabHeading} from 'native-base';
 

import * as Location from "expo-location";
import { useNavigation } from '@react-navigation/native';


import { FontAwesome } from '@expo/vector-icons'; 
import {getPlaygrounds} from './functions/getCourtsFunc'
import {getPotentialPlaygrounds} from './functions/getPotentialCourtsFunc'
import LiveCourtsTab from './liveCourts'
import PotentialCourtsTab from './potentialCourts'
import Filters from './filters'
import CourtMap from './map'

const CourtList = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [playgrounds, setPlaygrounds] = useState([]);
  const [potential_sites, setPotential_sites] = useState([]);
  const [filters, setFilters] = useState(['United States','New York','Beach']);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      setPlaygrounds(await getPlaygrounds())
      
      setPotential_sites(await getPotentialPlaygrounds())


    })();
  }, []);


  const filterCourts = (x) => {
    setFilters(x)
  }

  const showModal = () => {
    setModalVisible(!modalVisible)
    }
   


  return (
    <React.Fragment>
<Container>

        <Tabs tabBarUnderlineStyle={{backgroundColor:'grey'}}>
        
<Tab tabStyle ={{backgroundColor: '#e3e8e6'}} activeTextStyle={{color: 'grey', fontWeight: 'bold', fontSize:18}} activeTabStyle={{backgroundColor: '#e3e8e6'}} textStyle={{color: 'grey', fontWeight: 'normal'}} heading="Live Courts">
        
        <Filters filterCourts = {filterCourts}/>
        <LiveCourtsTab playgrounds = {playgrounds} filters = {filters}/>

        </Tab>
        <Tab tabStyle ={{backgroundColor: '#e3e8e6'}} activeTextStyle={{color: 'grey', fontWeight: 'bold', fontSize:18}} activeTabStyle={{backgroundColor: '#e3e8e6'}} textStyle={{color: 'grey', fontWeight: 'normal'}} heading="Potential Courts">


        <PotentialCourtsTab potential_sites = {potential_sites}/>

          </Tab>

        </Tabs>
        <TouchableOpacity 
           style={{
            position:'absolute', right:'4%', bottom:'4%',
            shadowColor: 'rgba(0,0,0, .4)', // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 1, //IOS
            backgroundColor: '#fff',
            elevation: 2, // Android
            alignItems:'center',
            justifyContent:'center',
            width:75,
            height:75,
            backgroundColor:'white',
            borderRadius:50,
          }}
          onPress = {() => showModal()}
      >
          <FontAwesome name="map-marker" size={30} color="black" />
        </TouchableOpacity>
        </Container>
        <CourtMap
        playgrounds = {playgrounds}
          modalVisible={modalVisible}
          showModal={() => showModal()}

        />
        </React.Fragment>
  );
}







export default CourtList