import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const makeDefault =(name,id,lat,lon,image, description, DefaultCourtFunc)=>{
    Alert.alert(
      `${name} selected.`,
      `Do you want to make ${name} your default court?`,
      [
        {
          text: "No",
          onPress: () => {
    
          },
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
    
          
    
          try {
            
            AsyncStorage.setItem('defaultCourt', JSON.stringify([name,id,lat,lon,image,description]))
            DefaultCourtFunc
          } catch (e) {
            console.log('something wrong (storage)')
          }
    
          alert(`Nice! ${name} is your new default court.`)
        } }
      ],
      { cancelable: false }
    );
  }