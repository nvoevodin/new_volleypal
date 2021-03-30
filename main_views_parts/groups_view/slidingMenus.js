import React, {useState, useEffect} from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import {Text,TouchableOpacity,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {getGroups} from './functions/groupFunctions'
import GroupsTab from './groups'
import YourGroupsTab from './yourGroups'
//import {getPlayersAndCourts} from './functions/getPlayersFunc'

import { connect } from 'react-redux';
// import Tab1 from './tabOne';
// import Tab2 from './tabTwo';
// import Tab3 from './tabThree';
const GroupsTabs = (props) => {

  const [groups, setGroups] = useState([]);
  const [trigger, setTrigger] = useState(true);
  //const [filters, setFilters] = useState(['United States','New York','Beach']);
 
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {


      setGroups(await getGroups(props.reducer.playgroundId))
      
      //setPotential_sites(await getPotentialPlaygrounds())


    })();
  }, [trigger, props.reducer.createGroupTrigger]);
  
  const triggerFunc = () => {
    setTrigger(!trigger)
  }


    return (
      <View>
       
        <Tabs tabBarUnderlineStyle={{backgroundColor:'grey'}}>
          <Tab tabStyle ={{backgroundColor: 'white'}} activeTextStyle={{color: 'grey', fontWeight: 'bold', fontSize:16}} activeTabStyle={{backgroundColor: 'white'}} textStyle={{color: 'grey', fontWeight: 'normal'}} heading="Groups">
 <GroupsTab groups = {groups} triggerFunc = {triggerFunc}/>
          </Tab>
          <Tab tabStyle ={{backgroundColor: 'white'}} activeTextStyle={{color: 'grey', fontWeight: 'bold', fontSize:16}} activeTabStyle={{backgroundColor: 'white'}} textStyle={{color: 'grey', fontWeight: 'normal'}} heading="Your Groups">
   <YourGroupsTab groups = {groups} triggerFunc = {triggerFunc}/>
          </Tab>
        </Tabs>
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
  )(GroupsTabs)
