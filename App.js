import React from 'react';
import {View} from 'react-native';

import * as firebase from 'firebase';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

//import BottomTabNavigator from './navigation/tabNavigation'
import { MainStackNavigator, ContactStackNavigator } from "./navigation/stackNavigation";


import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ourReducer from './store/reducer';






const store = createStore(ourReducer);


//global.x = 'https://volleypal.data39.site'
global.x = 'http://192.168.2.5:3007'
const firebaseConfig ={
  apiKey: "AIzaSyC-DLOVYQwdqibU8ZrBL7TnKx-H7HxmoPQ",
  authDomain: "geohutsport.firebaseapp.com",
  databaseURL: "https://geohutsport.firebaseio.com",
  projectId: "geohutsport",
  storageBucket: "geohutsport.appspot.com",
  messagingSenderId: "27754345566",
  appId: "1:27754345566:web:642a595875913337dab0cf",
  measurementId: "G-5P1D7NPV2E"

}


firebase.initializeApp(firebaseConfig)


export default function App() {
  return (
    <Provider store={ store }>
    
      <StatusBar style = {'auto'} />
   
    <NavigationContainer>
    <MainStackNavigator/>
  </NavigationContainer>
 
  
  </Provider>
   

  );
}


