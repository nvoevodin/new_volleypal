import React, {useEffect, useState} from 'react';
import { ScrollView ,StyleSheet, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux';

import HomeHeader from '../main_views_parts/events_view/header';
import HomeAccordion from '../main_views_parts/events_view/accordion';

import MainEvent from '../main_views_parts/events_view/first_tab'



const EventView = (props) => {

    const [members, setMembers] = useState(["none here"])
    const [waitlist, setWaitlist] = useState(["none here"])

    useEffect(() => {
        (async () => {
            
          //console.log(props.reducer.eventInfo)
           
          
          
      })();
      }, []);



    
   
        return(


         <React.Fragment>
          
           <HomeHeader playgroundImage = {props.reducer.playgroundImage}/>
           <HomeAccordion playground = {[{title:props.reducer.eventInfo["event_name"], content: props.reducer.eventInfo["description"]}]}/>
           <View style = {styles.container}>
            
           <MainEvent id = {props.reducer.eventInfo['admin_id']} invited = {props.reducer.eventInfo['invited']} waiting = {props.reducer.eventInfo['waiting']}/>

           </View>
           <StatusBar style="auto" />
            </React.Fragment>




        )
    

}



const styles = StyleSheet.create({
    container: {
      flex: 5,
      //backgroundColor: 'pink',
      //alignItems: 'center',
      justifyContent: 'center',
    },
  });



  const mapStateToProps = (state) => {
    
    const { reducer } = state
    return { reducer }
  };

  const mapDispachToProps = dispatch => {
    return {

      //storePlayground: (name,id,lat,lon) => dispatch({ type: "STORE_PLAYGROUND", value: name,value1: id, value2:lat,value3:lon})
     
    };
  };

  export default connect(mapStateToProps,
    mapDispachToProps
    )(EventView)