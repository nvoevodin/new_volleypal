import React, { useState} from 'react';
import { Octicons } from '@expo/vector-icons';
import {StyleSheet,Modal, TouchableOpacity, Alert, Image,View} from 'react-native';
import {Container, Header, Content, List, ListItem, Icon, Button, Left,Right, Body, Title,Text, Tab, Tabs,TabHeading} from 'native-base';
import { connect } from 'react-redux';
import * as Playground from './functions/selectPlayground';
import { useNavigation } from '@react-navigation/native';

const LiveCourtsTab = (props) => {
    const [defaultCourtId, setDefaultCourtId] = useState('');
    const navigation = useNavigation();
    //console.log(props.playgrounds)
  
    return(

<Content>
<List>

{props.playgrounds.filter(i => i['country'] === props.filters[0] && i['city'] === props.filters[1] && i['surface'] === props.filters[2]).map((object,index) =>

              <ListItem  key = {index}>
              <TouchableOpacity style = {{flexDirection:'row'}}
              onPress = {() => Playground.selectPlayground(object["site_name"], object["site_id"], object["latitude"], object["longitude"], object["image"],props.storePlayground(object["site_name"], object["site_id"], object["latitude"], object["longitude"], object["image"], object["description"], object["phone"], props.reducer.playgroundDefault),navigation.navigate("Court"))} 
              //onPress={() => {this.selectPlayground(object["site_name"], object["site_id"], object["latitude"], object["longitude"]),  this.props.checkIfChecked(),this.props.checkIfPreChecked()}}
              >
      
      <Image
style={styles.tinyLogo}
source={{
uri: `${global.x}`+ '/' + object["image"]
}}
/>
    {/* <Text>{object["site_name"]}</Text> */}
  
    
      <View style = {{marginLeft:10, flex:1, justifyContent:'space-between'}}>
        <View style={{alignSelf:'flex-start'}}>
        <Text style = {{fontWeight:'bold'}}>{object["site_name"]}</Text>
          </View>
       <View style={{flexDirection:'row', justifyContent:'space-between'}}>
         <View>
         <Text>{object["city"]}</Text>
         </View>
       
      <View>
      <Text>{object["distance"]} km</Text>
      </View>
       
      
       </View>

         {/* <View>
         {props.reducer.playgroundDefault === object["site_id"]?
         <Button style = {{textAlign: 'center', margin: 'auto',height: 35}}
      //    onPress ={() => {this.makeDefault(object["site_name"], object["site_id"], object["latitude"], object["longitude"])}}
         success
         disabled >
          <Text style = {{fontSize:10}}>Default</Text>
          </Button>:
                      <Button style = {{textAlign: 'center', margin: 'auto',height: 35}}
                      // onPress ={() => {this.makeDefault(object["site_name"], object["site_id"], object["latitude"], object["longitude"])}}
                      info >
                       <Text style = {{fontSize:10}}>Default?</Text>
                       </Button>
}
         </View> */}
         <View style={{alignSelf:'flex-start', color: 'green'}}>
         <Text style={{color: 'green'}}>{object["surface"] + ' ' + '('+object["type"]+')'}</Text>
         </View>

      </View>
       {/* {this.state.defaultCourtId === object["site_id"]?<Text>default</Text>:null} */}
  {/* <Button onPress={() => {this.selectPlayground(object["site_name"], object["site_id"], object["latitude"], object["longitude"]), this.props.onModalOne(), this.props.checkIfChecked(),this.props.checkIfPreChecked()}}>
    <Icon name='arrow-forward'/>
  </Button> */}

</TouchableOpacity>
  </ListItem>



)}
</List>
</Content>

    )}

const styles = StyleSheet.create({

    tinyLogo: {
      width: 120,
      height: 120,
      
    },
  
  });


  const mapStateToProps = (state) => {
    
    const { reducer } = state
    return { reducer }
  };

  const mapDispachToProps = dispatch => {
    return {

      storePlayground: (name,id,lat,lon,img,description,phone,idDefault) => dispatch({ type: "STORE_PLAYGROUND", value: name,value1: id, value2:lat,value3:lon,value4:img,value5:description,value6:phone, value7:idDefault})
     
    };
  };

  export default connect(mapStateToProps,
    mapDispachToProps
    )(LiveCourtsTab) 