import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const ProfileView = (props)=> {

  const navigation = useNavigation();
        return(


         <React.Fragment>
           
           <View style = {styles.container}>
           <TouchableOpacity onPress = {()=>navigation.navigate("Courts")}>
             <Text>Profile</Text>
             </TouchableOpacity>
             </View>
           
           
            <StatusBar style="auto" />
            </React.Fragment>




        )
    

}
export default ProfileView


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });