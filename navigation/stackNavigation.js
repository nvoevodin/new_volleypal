import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CourtListView from '../main_views/CourtListView'
import ProfileView from '../main_views/ProfileView'
import CourtView from '../main_views/CourtView'
import AddCourtView from '../main_views/AddCourtView'
import WelcomeScreen from '../main_views/WelcomeScreen'
import AddEventView from '../main_views/AddEventView'
import EventView from '../main_views/EventsView'
import SettingsView from '../main_views/SettingsView'
import AddGroup from '../main_views_parts/groups_view/addGroup'
import GroupView from '../main_views/GroupView'
import QueueCourtView from '../main_views/QueueCourtView'

import CourtTab from './courtTabNav'

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator 
    screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Courts" component={CourtListView} />
      <Stack.Screen name="Court" component={CourtTab} />
      <Stack.Screen name="AddCourt" component={AddCourtView} />
      <Stack.Screen name="AddEventView" component={AddEventView} />
      <Stack.Screen name="EventView" component={EventView} />
      <Stack.Screen name="SettingsView" component={SettingsView} />
      <Stack.Screen name="AddGroup" component={AddGroup} />
      <Stack.Screen name="GroupView" component={GroupView} /> 
      <Stack.Screen name="QueueCourt" component={QueueCourtView} />
      
    </Stack.Navigator>

    
  );
}


const ContactStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Profile" component={ProfileView} />
      </Stack.Navigator>
    );
  }

export { MainStackNavigator,ContactStackNavigator };