import React, { useState } from "react";
import { Content, Form, Picker } from "native-base";

import { View } from "react-native";

const ModePicker = (props) => {
  const [selected, setSelected] = useState("Public");

  const onValueChange = (value) => {
    props.SendModeFromPicker(value);
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
          <Picker.Item label="Cancel" value="Cancel" />
          {["Public"].map((item, index) => {
            return <Picker.Item key={index} label={item} value={item} />;
          })}
        </Picker>
      </Form>
    </View>
  );
};
export default ModePicker;
