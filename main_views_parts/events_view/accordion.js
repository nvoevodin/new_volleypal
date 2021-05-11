import React from "react";
import { View } from "react-native";
import { Container, Header, Content, Accordion } from "native-base";
const dataArray = [
  {
    title: "BRIGHTON COURTS",
    content:
      "Lorem ipsum dolor sit amethhhhhhhhgjghjghjghjghhghghgjgghjghjghjghhgjhgjhgjhgjghjghhgjhgjghjghjghjhgjhgjhghghgjhgjhgjghjhggjghghgjkjghjjkhfkjkjhghkhkjhkhjkgkfhjkfhkjhjkjhkyukjkhjkkjhkjhgkhkhjjgkjkkhjkhjkjhkydtujhkydtykuytutrtjklukytujkjljghkhuhjkjkydtjukukiydtkkyl,yjkuykytkyujjkyghjghjgh",
  },
];
const HomeAccordion = (props) => {
  console.log(props.playground);

  return (
    <View>
      <Accordion dataArray={props.playground} expanded = {1} />
    </View>
  );
};

export default HomeAccordion;
