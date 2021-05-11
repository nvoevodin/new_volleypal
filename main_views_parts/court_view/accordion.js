import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert, Linking } from "react-native";
import { Container, ListItem, Left, Button,Accordion } from "native-base";
const dataArray = [
  {
    title: "BRIGHTON COURTS",
    content:
      "Lorem ipsum dolor sit amethhhhhhhhgjghjghjghjghhghghgjgghjghjghjghhgjhgjhgjhgjghjghhgjhgjghjghjghjhgjhgjhghghgjhgjhgjghjhggjghghgjkjghjjkhfkjkjhghkhkjhkhjkgkfhjkfhkjhjkjhkyukjkhjkkjhkjhgkhkhjjgkjkkhjkhjkjhkydtujhkydtykuytutrtjklukytujkjljghkhuhjkjkydtjukukiydtkkyl,yjkuykytkyujjkyghjghjgh",
  },
];
const HomeAccordion = (props) => {
  
  const addDescription = () => {
    Alert.alert(
      `Add description?.`,
      `This court has a crappy or no description. Please make sure you submit us a proper description of no less than 100 words. Look at some other courts descriptions for reference. Email us the description and we will take it from there.`,
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            Linking.openURL(`mailto:volleypalapp@gmail.com?subject=${props.playground[0]['title']}&body=Write a proper description for this court!`)
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderContent1 = (item) => {
    return (

      <View>
        <Text style = {{padding:'4%', textAlign:'justify', fontSize:15}}>{props.playground[0]['content']}</Text>
        {props.playground[0]['content'].length < 150 &&
      <ListItem>
      <Left style = {{marginRight:25}}>
      <Text>This court does not have a proper description. Add one please!</Text>

      </Left>
  
      <Button
          style={{ backgroundColor: "green", padding: 20 }}
          onPress={() => addDescription() }
        >
          <Text style = {{color:'white'}}>{"ADD"}</Text>
        </Button>
  
    </ListItem>
  }
    </View>
    );
  }

  return (
    <View>
      <Accordion dataArray={props.playground} expanded = {1} renderContent={renderContent1}/>
    </View>
  );
};

export default HomeAccordion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:20,
    backgroundColor: '#F6483B'
  },
  accordion:{
    width: '90%',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding:20,
    justifyContent: 'center'
  },
  accordionHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding:10,    

  },
  accordionTitle: {
    fontSize: 20, 
    fontWeight:'bold',
    marginBottom: 20,
    color: '#62625A'
  },
  accordionItems: {
    borderRadius: 5,
    backgroundColor:'white',

  },
  accordionItemValue:{
    flexDirection: 'row',
    justifyContent:"space-between",
    padding: 10,

  },
  accordionItemValueBadge: {
    color: '#42C382',
    padding: 5,
    fontWeight: 'bold'
  },
  accordionItemValueName: {
    color: '#62625A'
  }
})
