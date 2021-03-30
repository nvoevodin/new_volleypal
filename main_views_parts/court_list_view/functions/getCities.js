



export const getCities = (country) => {


    
    let fetchResult = fetch(`${global.x}/get_locations`)
    .then((res) => res.json())
    .then((res) => {

    
     

 var cities = res.data.filter( i => i["countries"] === country )
cities = cities[0]["cities"]




return cities
      //return cities[0]["cities"]

  
      
    
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