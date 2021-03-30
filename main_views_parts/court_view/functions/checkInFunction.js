import {Alert} from "react-native";
import {getCurrentLoc} from '../../court_list_view/functions/getCurrentLocation' 
import {calculateDistance} from '../../court_list_view/functions/caclulateDistanceFunc'
const moment = require("moment");
export const checkIn =  async (playgroundId, isAnanimous, firstName, lastName, userId, playgroundLat, playgroundLon, submitted) => {



    
if (!submitted){
    try {
        //get location
        let location = await getCurrentLoc();

        //test how far away the user is
        let distance = await calculateDistance(
          parseFloat(location[0].coords.latitude),
          parseFloat(location[0].coords.longitude),
          playgroundLat,
          playgroundLon
        );

        

        if (distance['distance'] <= 200) {

            

          fetch(
         
            `${global.x}/add?time=${
            moment().utc().format("YYYY-MM-DD HH:mm:ss").substr(0, 18) + "0"
            }&site_id=${playgroundId}&first_name=${isAnanimous ? "Anonymous" : firstName}
            &last_name=${isAnanimous ? "Player" : lastName}&user_id=${userId}`,
            { method: "POST" }
          ).catch((error) => {
            console.log(error)
          });

          

          Alert.alert(
            "Checked In. Thank You!"
          );
          return true

        } else if (distance['distance'] > 200) {
      
          Alert.alert("Please move closer to your site and try again.");
        }
      } catch (e) {
        console.log(e);
      }
      

} else {

    await fetch(
      // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
      `${global.x}/update?site_id=${playgroundId}&user_id=${userId}`,
      { method: "PUT" }
    ).catch((error) => {
      console.log(error)
    })

    await fetch(
      // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
      `${global.x}/addToStorage?site_id=${playgroundId}&user_id=${userId}`,
      { method: "POST" }
    ).catch((error) => {
      console.log(error)
    })
    var result = fetch(
      // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
      `${global.x}/delete?site_id=${playgroundId}&user_id=${userId}`,
      { method: "DELETE" }
     
    ).catch((error) => {
      console.log(error)
    })


    



    Alert.alert(
      "You left. Good bye."
    );
    return false
  }


    



}