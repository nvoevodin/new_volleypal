import { calculateDistance } from "./caclulateDistanceFunc";
import * as GettingLocs from "./getCurrentLocation";

export const getPlaygrounds = async () => {
  let location = await GettingLocs.getCurrentLoc();

  let fetchResult = fetch(`${global.x}/sites`)
    .then((res) => res.json())
    .then((res) => {
      //console.log(res.data)

      var distanceData = res.data.map((i) => {
        //test how far away the user is
        let distance = calculateDistance(
          parseFloat(location[0].coords.latitude),
          parseFloat(location[0].coords.longitude),
          i.latitude,
          i.longitude
        );

        i["distance"] = distance["distance"] / 1000;

        return i;
      });
      return distanceData;
    })
    .catch((error) => {
      //console.log(error)
    });

  return fetchResult;
  // AsyncStorage.getItem('defaultCourt', (error, result) => {

  //   var res = JSON.parse(result)
  //   try {
  //   this.setState({defaultCourtId: res[1]})
  //   } catch(e){}
  // });
};
