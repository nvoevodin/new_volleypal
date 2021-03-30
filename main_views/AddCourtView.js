import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import AddCourtHeader from '../main_views_parts/add_courts_view/header'
import AddCourtBody from '../main_views_parts/add_courts_view/body'

const AddCourtView = (props)=> {

  const navigation = useNavigation();
        return(


         <React.Fragment>
           <AddCourtHeader/>
           <AddCourtBody/>
           
           
            <StatusBar style="auto" />
            </React.Fragment>




        )
    

}
export default AddCourtView


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });