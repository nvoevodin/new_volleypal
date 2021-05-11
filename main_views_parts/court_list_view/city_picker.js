import React, { useState } from "react";
import { Form, Picker } from "native-base";
import { toTitleCase } from "../../helper_functions/functions";

import { View } from "react-native";

const CityPicker = (props) => {
  const [selected, setSelected] = useState("");

  const onValueChange = (value) => {
    props.SendCityFromPicker(value);
    setSelected(value);
  };

  return (
    <View>
      <Form>
        {props.cities1 && (
          <Picker
            placeholder="Select"
            note
            mode="dropdown"
            style={{ width: 250 }}
            selectedValue={selected}
            onValueChange={(x) => onValueChange(x)}
          >
            <Picker.Item label="Cities" />
            {props.cities1.map((item, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={toTitleCase(item)}
                  value={item}
                />
              );
            })}
          </Picker>
        )}
      </Form>
    </View>
  );
};
export default CityPicker;
