import React, {useState, useEffect} from 'react';
import {Container, Header, Content, ListItem, List, Icon, Button, Left,Input, Item, Label, Body, Title, Right,Tab,Tabs} from 'native-base';
import {Text,TouchableOpacity,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {getMembers, getPlayers,getWaitlist,getInvited,addToGroup,removeFromGroup,sendInvite} from './functions/groupFunctions'

import moment from "moment";
import { connect } from 'react-redux';

const GroupTabs = (props) => {

  const [members, setMembers] = useState([]);
  const [players, setPlayers] = useState([[],[]]);
  const [waitlist, setWaitlist] = useState([]);
  const [invited, setInvited] = useState([]);
  const [changeState, setChangeState] = useState(false);
  const [invitePrompt, setInvitePrompt] = useState(false)
;

 
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {


      setMembers(await getMembers(props.groupId))
     
      var res = await getPlayers(props.reducer.playgroundId)
      setPlayers(res)

      setWaitlist(await getWaitlist(props.groupId))
      setInvited(await getInvited(props.groupId))
      
 
    })();
  }, []);




    return (
      <View>
       
        <Tabs tabBarUnderlineStyle={{backgroundColor:'grey'}}>
          <Tab tabStyle ={{backgroundColor: 'white'}} activeTextStyle={{color: 'grey', fontWeight: 'bold', fontSize:16}} activeTabStyle={{backgroundColor: 'white'}} textStyle={{color: 'grey', fontWeight: 'normal'}} heading="Members">
          <List>
        <ListItem itemDivider>
          <Left>
          <Text style ={{fontWeight:'bold',fontSize:10}}>Player</Text>
          </Left>
          <Body>
          <Text style ={{fontWeight:'bold',fontSize:10}}>Arriving</Text>
          </Body>
          <Right>
          <Text style ={{fontWeight:'bold',fontSize:10}}>At Court</Text>
          </Right>
              
            </ListItem>   
        
        {members.map((object,index) =>

 
          
          <ListItem  key = {index}>
  <Left>
<Text style = {{fontSize:11}} >{object['first_name'] +' '+ object['last_name']}</Text>
  </Left>

  <Body>
  {players[1].map((x,j) =>

   
 
x['user_id'] === object['uid']?  
<Text style = {{fontSize:11}} key = {j}>{moment(x["pre_checkin_datetime"]).format('LT')}</Text>:null

)}
  </Body>
  
  <Right>
  
      
  {players[0].map((x,j) =>

   
 
    x['user_id'] === object['uid']?  
  <Text style = {{fontSize:11}} key = {j}>{moment(x["checkin_datetime"]).format('LT')}</Text>:null
   
  )}

  </Right>
 
  </ListItem> )}

  </List>
          </Tab>





          {props.adminId === props.reducer.userInfo[3] &&
          <Tab tabStyle ={{backgroundColor: 'white'}} activeTextStyle={{color: 'grey', fontWeight: 'bold', fontSize:16}} activeTabStyle={{backgroundColor: 'white'}} textStyle={{color: 'grey', fontWeight: 'normal'}} heading="Admin">

<List>
<ListItem itemDivider>
  <Left>
<Text style ={{fontWeight:'bold',fontSize:18}}>Invited</Text>
  </Left>
              
              <TouchableOpacity onPress={() => setInvitePrompt(true)}>
    <Text style = {{color:'green', fontWeight:'bold', fontSize:18, marginRight:'2.6%'}}>Invite</Text>
  </TouchableOpacity>

  
            </ListItem>  

              {invitePrompt && 
<ListItem>
  <Left>
  <Item floatingLabel>
            <Label>Type an email here</Label>
            <Input
              secureTextEntry={false}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email.trim())}
              
            />

          </Item>
  </Left>

 
  
  <TouchableOpacity onPress={()=>sendInvite(props.groupId,object['email']), closePrompt = setInvitePrompt(false)}>
  <Icon name='arrow-forward' style = {{color:'black'}}/>
  </TouchableOpacity>
</ListItem>
  

  


     
          } 
        {invited.map((object,index) =>

        
       
          <ListItem  key = {index}>
  <Left>
<Text>{object['first_name'] +' '+ object['last_name']}</Text>
  </Left>
  <Right>
  {object['email'] === props.adminId?<Text>Admin</Text>:null
//     <TouchableOpacity 
//     onPress={() => this.addToGroup(object['email']) }
//     >
// <AntDesign name="adduser" size={30} color="green"/>  
// </TouchableOpacity>
}
  </Right>
        </ListItem>)}
<ListItem itemDivider>
  
  <Text style ={{fontWeight:'bold',fontSize:18}}>Waitlist</Text>
  

              
            </ListItem>   
        {waitlist.map((object,index) =>

        
       
          <ListItem  key = {index}>
  <Left>
<Text>{object['first_name'] +' '+ object['last_name']}</Text>
  </Left>
  <Right>
  {object['email'] === props.adminId?<Text>Admin</Text>:
    <TouchableOpacity 
    onPress={() => addToGroup(props.groupId,object['email']), changeState = setChangeState(!changeState) }
    >
<AntDesign name="adduser" size={30} color="green"/>  
</TouchableOpacity>}
  </Right>
        </ListItem>)}
        <ListItem itemDivider>
              <Text style ={{fontWeight:'bold',fontSize:18}}>Members</Text>
            </ListItem> 
            {members.map((object,index) =>

        
       
<ListItem  key = {index}>
<Left>
<Text>{object['first_name'] +' '+ object['last_name']}</Text>
</Left>
<Right>
{object['email'] === props.adminId?<Text>Admin</Text>:
<TouchableOpacity 
onPress={() => removeFromGroup(props.groupId,object['email']), changeState = setChangeState(!changeState) }

>
<AntDesign name="deleteuser" size={30} color="red"/>  
</TouchableOpacity>}
</Right>
</ListItem>)}

  </List>


          </Tab>
}
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
  )(GroupTabs)
