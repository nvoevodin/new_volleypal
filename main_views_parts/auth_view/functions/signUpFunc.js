
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

export const addUser = (uid, firstName, lastName, email) => {
    
    fetch(
      
      `${global.x}/new_user?datetime_stamp=${
        moment().utc().format("YYYY-MM-DD HH:mm:ss").substr(0, 18) + "0"
      }&uid=${uid}&first_name=${firstName}&last_name=${lastName}&email=${email}`,
      { method: "POST" }
    ).catch((error) => {
      
      console.log(error)
    });



    try {
      AsyncStorage.setItem('user_info', JSON.stringify([uid, firstName, lastName, email]))
    } catch (e) {
      
      console.log('something wrong (storage)')
    }

  };

 
