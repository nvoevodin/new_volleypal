import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity, Alert,View} from 'react-native';
import { Left, ListItem, Text, Separator,Button,List} from 'native-base';
import { connect } from 'react-redux';
import {getEvents,deleteEvent} from './functions/getEventsFunction'
const moment = require("moment");


import { useNavigation } from '@react-navigation/native';

const EventsTab =(props)=> {

  const navigation = useNavigation();

  const [events, setEvents] = useState([''])
  
  //const [preChecked, setPreChecked] = useState(false)
  const [trigger, setTrigger] = useState(true)

  
  useEffect(() => {
    (async () => {

       const gettingEvents =  await getEvents(props.reducer.playgroundId)
       
       setEvents(gettingEvents)
     
        


  })();
  }, [trigger]);


  const deleteEventFunc = (x) => {
    
    deleteEvent(x)
    setTrigger(!trigger)
    alert('Event deleted!')
  }
  

    return (
      <>
      <ScrollView>
   
   {
   events.map((i, index) => 
  <List key = {index}>
      <Separator  bordered>
        <Text>{moment(i["date"]).utc().format('ll')}</Text>
      </Separator>

   
       
            {i['list'] && JSON.parse(i['list']).map((x, index)=>
             
                 <ListItem key = {index}>
                 
                   <TouchableOpacity style = {{flexDirection:'row'}} onPress = {() => {props.storeEventInfo(x),navigation.navigate('EventView')}}>
           <View style = {{marginLeft:10, flex:1, justifyContent:'space-between'}}>
        <View style={{alignSelf:'flex-start'}}>
        <Text style = {{fontWeight:'bold'}}>{x['event_name']}</Text>
          </View>
       <View style={{flexDirection:'row', justifyContent:'space-between'}}>
         <View>
         <Text>{x['type']}</Text>
         </View>
       
      <View>
      <Text>{moment.utc(x['time']).local().format('LT')}</Text>
      </View>
       {
        x['admin_id'] === props.reducer.userInfo[0] &&
        <TouchableOpacity onPress = {()=>deleteEventFunc(x['id'])}> 
      <View>
      <Text style = {{fontWeight:'bold', color:'red'}}>Delete</Text>
            </View>
            </TouchableOpacity>
       }

       </View>


      </View>
      </TouchableOpacity>
                 </ListItem>
           
      
         )}

   </List>
   )
   }


      </ScrollView>
     
      </>
    );
  
}


const mapStateToProps = (state) => {
    
  const { reducer } = state
  return { reducer }
};

const mapDispachToProps = dispatch => {
  return {
    storeEventInfo: (x) => dispatch({ type: "STORE_EVENT_INFO", value: x}),
    //cancelPreCheck: () => dispatch({ type: "TOGGLE_PRECHECK", value: false }),
    
  };
};

export default connect(mapStateToProps,
  mapDispachToProps
  )(EventsTab)