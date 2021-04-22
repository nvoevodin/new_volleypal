import React, { useState } from "react";
import { Content, Form, Picker } from "native-base";

import { View } from "react-native";

const TypePicker = (props) => {
  const [selected, setSelected] = useState("");

  const onValueChange = (value) => {
    props.SendTypeFromPicker(value);
    setSelected(value);
  };

  return (
    <View>
      <Form>
        <Picker
          placeholder="Select"
          note
          mode="dropdown"
          style={{ width: 250 }}
          selectedValue={selected}
          onValueChange={(x) => onValueChange(x)}
        >
          <Picker.Item label="Type" />
          {["Beach", "Indoor", "Grass"].map((item, index) => {
            return <Picker.Item key={index} label={item} value={item} />;
          })}
        </Picker>
      </Form>
    </View>
  );
};
export default TypePicker;
