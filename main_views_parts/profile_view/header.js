import React from "react";
import { View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
} from "native-base";
import { ImageBackground } from "react-native";

const PlayersHeader = (props) => {
  return (
    <View style={{ flex: 2 }}>
      <ImageBackground
        source={{ uri: `${global.x}` + "/" + props.playgroundImage }}
        style={{ width: "100%", height: "100%" }}
      >
        <Header
          style={{
            backgroundColor: "transparent",
            borderBottomWidth: 0,
            elevation: 0,
          }}
        >
          {/* <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
            <Button transparent>
              <Text>Cancel</Text>
            </Button>
          </Right> */}
        </Header>
      </ImageBackground>
    </View>
  );
};

export default PlayersHeader;
