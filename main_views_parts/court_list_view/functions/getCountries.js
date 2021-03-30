



export const getCountries = async () => {

 
    
    let fetchResult = fetch(`${global.x}/get_locations`)
    .then((res) => res.json())
    .then((res) => {
     

        let result = res.data.map(a => a['countries']);
     
      
      return result

  
      
    
    }).catch((error) => {
      //console.log(error)
    });

return fetchResult
    // AsyncStorage.getItem('defaultCourt', (error, result) => {
   
    //   var res = JSON.parse(result) 
    //   try {
    //   this.setState({defaultCourtId: res[1]})
    //   } catch(e){}
    // });

}