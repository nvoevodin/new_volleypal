import React from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import {Text,TouchableOpacity,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainList from './first_tab'
//import EventsTab from './second_tab'
// import Tab1 from './tabOne';
// import Tab2 from './tabTwo';
// import Tab3 from './tabThree';
const HomeTabs = (props) => {
    const navigation = useNavigation();
    return (
      <View>
       
        <Tabs tabBarUnderlineStyle={{backgroundColor:'grey'}}>
          <Tab tabStyle ={{backgroundColor: 'white'}} activeTextStyle={{color: 'grey', fontWeight: 'bold', fontSize:16}} activeTabStyle={{backgroundColor: 'white'}} textStyle={{color: 'grey', fontWeight: 'normal'}} heading="Courts">
       <MainList/>
          </Tab>
          <Tab tabStyle ={{backgroundColor: 'white'}} activeTextStyle={{color: 'grey', fontWeight: 'bold', fontSize:16}} activeTabStyle={{backgroundColor: 'white'}} textStyle={{color: 'grey', fontWeight: 'normal'}} heading="Events">
          <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
            <Text>Nothing Here Yet</Text>
            </View>
          </Tab>
        </Tabs>
      </View>
    );
  
}

export default HomeTabs