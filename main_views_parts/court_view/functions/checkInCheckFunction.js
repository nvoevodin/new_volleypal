const moment = require("moment");
export const checkedInCheck = async (uid, playgroundId) => {
  //console.log('CHECKING STATUS AGAIN...')
  var result = await fetch(`${global.x}/checkincheck/${uid}`)
    .then((res) => res.json())
    .then((res) => {
      if (
        res["data"].some(
          (e) =>
            e.checkin_datetime.substr(0, 10) ===
            moment().utc().format("YYYY-MM-DD")
        ) &&
        res["data"].some((e) => e.site_id === playgroundId)
      ) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
};
