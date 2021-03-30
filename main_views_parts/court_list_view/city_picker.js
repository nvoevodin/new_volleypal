import React, { useState } from "react";
import {Content,Form,Picker } from "native-base";

import {

  View,
 
} from "react-native";




const CityPicker = (props)=> {
  console.log(props.cities1)
const [selected, setSelected] = useState('New York')



  const onValueChange = (value) => {
    props.SendCityFromPicker(value)
    setSelected(value);
  }

    return (

        <View>
          <Form>
          {props.cities1 &&
              <Picker
              placeholder = 'Select'
                note
                mode="dropdown"
                style={{ width: 250 }}
                selectedValue={selected}
                onValueChange={(x) => onValueChange(x)}
              >
             
                <Picker.Item label="Cities"/>
                  {
                      props.cities1.map((item,index)=>{
                          
  return <Picker.Item key = {index} label={item} value={item}  />
                      })
                  }
                
  
              </Picker>   
              }
           
          </Form>
        </View>
   
    );
  
}
export default CityPicker;