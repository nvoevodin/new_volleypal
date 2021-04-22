export const getEvents = async (playgroundId) => {
  const result = await fetch(`${global.x}/get_events/${playgroundId}`)
    .then((res) => res.json())
    .then((res) => {
      const data = res.data;

      return data;
    })
    .catch((error) => {
      //console.log(error)
    });

  return result;
  // AsyncStorage.getItem('defaultCourt', (error, result) => {

  //   var res = JSON.parse(result)
  //   try {
  //   this.setState({defaultCourtId: res[1]})
  //   } catch(e){}
  // });
};

export const deleteEvent = (event_id) => {
  fetch(
    // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
    `${global.x}/deleteEvent?event_id=${event_id}`,
    { method: "DELETE" }
  ).catch((error) => {
    console.log(error);
  });
};
