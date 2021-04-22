export const getPlayersAndCourts = async (playgroundId) => {
  var checkins = await fetch(`${global.x}/players/${playgroundId}`)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });

  var prechecks = await fetch(`${global.x}/pre_checks/${playgroundId}`)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return [checkins, prechecks];
};
