import React, {useState, useEffect} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CourtView from '../main_views/CourtView'
import PlayersView from '../main_views/PlayersView'
import SignInView from '../main_views/AuthView'
import GroupsView from '../main_views/GroupsView'
import LostAndFoundView from '../main_views/LostAndFoundView'
import { connect } from "react-redux";
import * as firebase from "firebase";
const Tab = createBottomTabNavigator();


const CourtTab = (props) => {
const [signedIn, setSignedIn] = useState(props.reducer.signedIn);



useEffect(() => {

  setSignedIn(props.reducer.signedIn)

}, [props.reducer.signedIn]);

    return (
      
            <>
            {signedIn?
<Tab.Navigator 
    screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Players') {
              iconName = focused ? 'ios-person' : 'ios-person';
            }
            else if (route.name === 'Groups') {
                iconName = focused ? 'ios-people' : 'ios-people';
              }
              else if (route.name === 'L&F') {
                iconName = focused ? 'ios-information-circle-outline' : 'ios-information-circle-outline';
              }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
      <Tab.Screen name="Home" component={CourtView} />
      <Tab.Screen name="Players" component={PlayersView} />
      <Tab.Screen name="Groups" component={GroupsView} />
      <Tab.Screen name="L&F" component={LostAndFoundView} />
    </Tab.Navigator>:
    <Tab.Navigator 
    screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Authentication') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Players') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
      <Tab.Screen name="Authentication" component={SignInView} />

    </Tab.Navigator>}
    </>
    
    )}

   
    const mapStateToProps = (state) => {
    
      const { reducer } = state
      return { reducer }
    };
    
    const mapDispachToProps = dispatch => {
      return {
  
      };
    };
    
    export default connect(mapStateToProps, mapDispachToProps)(CourtTab);