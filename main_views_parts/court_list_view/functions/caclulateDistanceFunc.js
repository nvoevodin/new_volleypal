import { getDistance } from "geolib";

export const calculateDistance = (start_x,start_y, end_x,end_y, name) => {
    try {
      let distance = getDistance(
        {
          latitude: start_x,
          longitude: start_y,
        },
        {
          latitude: end_x,
          longitude: end_y,
        },
        accuracy = 10
      );
     
      //checkin(distance);
      //console.log(distance)
        return {name: name, distance:distance};  
      } catch (error) {
      //console.log(error)
    }
  }