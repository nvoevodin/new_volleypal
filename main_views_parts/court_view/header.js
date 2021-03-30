import React, {useState, useEffect} from "react";
import {View,Platform, StyleSheet, Linking} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {makeDefault} from './functions/defaultFunction'
import { connect } from 'react-redux';

const HomeHeader = (props) =>  {
  
  const navigation = useNavigation();

  const [defaultCourt, setDefaultCourt] = useState(false)


  useEffect(() => {

   
props.reducer.playgroundId === props.reducer.playgroundDefault?setDefaultCourt(true):null


  }, []);

  const openMaps = (latitude, longitude) => {
    const daddr = `${latitude},${longitude}`;
    const company = Platform.OS === "ios" ? "apple" : "google";
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
  }

  const openCall = (number) => {
    
   
    Linking.openURL(`tel:${number}`);
  }

    return (
      <View style = {{flex:2}}>
     <ImageBackground 
     source={{uri: `${global.x}`+ '/' + props.playgroundImage}} 
     style={{width: '100%',height: '100%'}}>
              <Header style = {styles.header}>
           <Left>
            <Button 
            rounded style = {{backgroundColor:'rgba(212, 190, 190, 0.85)'}}
            onPress = {()=>navigation.navigate("Courts")}
            >
              <Icon name='arrow-back' style = {{color:'black'}}/>
            </Button>
          </Left>
 
          <Right>
            <Button 
            
            rounded style = {defaultCourt?{backgroundColor:'green'}:{backgroundColor:'rgba(212, 190, 190, 0.85)'}}
            onPress = {()=>defaultCourt?alert('This is your default court.'):makeDefault(props.reducer.playgroundName,props.reducer.playgroundId,props.reducer.playgroundLat,props.reducer.playgroundLon,props.reducer.playgroundImage, props.reducer.playgroundDescription, DefaultCourtFunc = setDefaultCourt(true))}>
              <Text 
              style = {defaultCourt?{color:'white'}:{color:'black'}}>
                {defaultCourt?"Default":"Make Default"}
                </Text>
            </Button>
          </Right> 
        </Header>
        
    </ImageBackground>
    <View style = {{position:'absolute', bottom: '3%', right:'2%', flexDirection: 'row'}}>
      {
        props.reducer.playgroundPhone !=='0' &&
        <Button 
            
            rounded style = {{backgroundColor:'rgba(212, 190, 190, 0.85)', right: '3%'}}
            onPress = {()=> openCall(props.reducer.playgroundPhone)}>
              <Text 
              style = {{color:'blue', fontSize:10}}>
                Call
                </Text>
            </Button>
      }
    
            <Button 
            
            rounded style = {{backgroundColor:'rgba(212, 190, 190, 0.85)'}}
            onPress = {()=> openMaps(props.reducer.playgroundLat,props.reducer.playgroundLon)}>
              <Text 
              style = {{color:'blue', fontSize:10}}>
                Directions
                </Text>
            </Button>
    </View >

      </View>

      
    );
  
}

const mapStateToProps = (state) => {
    
  const { reducer } = state
  return { reducer }
};

const mapDispachToProps = dispatch => {
  return {
    //toggle_timer_modal: () => dispatch({ type: "TOGGLE_TIMER_MODAL", value: true}),
    //cancelPreCheck: () => dispatch({ type: "TOGGLE_PRECHECK", value: false }),
    
  };
};

export default connect(mapStateToProps,
  mapDispachToProps
  )(HomeHeader)



const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        borderBottomWidth: 0
      },
      android: {
        top:'6%', borderBottomWidth: 0,elevation: 0
      }

    })
  }
});