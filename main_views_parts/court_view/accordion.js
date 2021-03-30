import React from "react";
import {View, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Accordion } from "native-base";
const dataArray = [
  { title: "BRIGHTON COURTS", content: "Lorem ipsum dolor sit amethhhhhhhhgjghjghjghjghhghghgjgghjghjghjghhgjhgjhgjhgjghjghhgjhgjghjghjghjhgjhgjhghghgjhgjhgjghjhggjghghgjkjghjjkhfkjkjhghkhkjhkhjkgkfhjkfhkjhjkjhkyukjkhjkkjhkjhgkhkhjjgkjkkhjkhjkjhkydtujhkydtykuytutrtjklukytujkjljghkhuhjkjkydtjukukiydtkkyl,yjkuykytkyujjkyghjghjgh" }

];
 const HomeAccordion = (props) => {
  

    return (

        <View>
          <Accordion dataArray={props.playground}/>
        </View>

    );
  
}


export default HomeAccordion