import React, { useState } from "react";
import { Content, Form, Picker } from "native-base";

import DATA from "./data/countries.json";

const countries = DATA.map((a) => a.name);

const CountryPicker = (props) => {
  const [selected, setSelected] = useState("United States");

  const onValueChange = (value) => {
    props.SendCountryFromPicker(value);
    setSelected(value);
  };

  return (
    <Content>
      <Form>
        <Picker
          note
          mode="dropdown"
          style={{ width: 250 }}
          selectedValue={selected}
          onValueChange={(x) => onValueChange(x)}
        >
          <Picker.Item label="Cancel" value="Cancel" />
          {countries.map((item, index) => {
            return <Picker.Item key={index} label={item} value={item} />;
          })}
        </Picker>
      </Form>
    </Content>
  );
};
export default CountryPicker;
