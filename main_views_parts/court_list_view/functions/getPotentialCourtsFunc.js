export const getPotentialPlaygrounds = async () => {
  let fetchResult = fetch(`${global.x}/potential_sites`)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //console.log(error)
    });

  // AsyncStorage.getItem('defaultCourt', (error, result) => {

  //   var res = JSON.parse(result)
  //   try {
  //   this.setState({defaultCourtId: res[1]})
  //   } catch(e){}
  // });
  return fetchResult;
};
