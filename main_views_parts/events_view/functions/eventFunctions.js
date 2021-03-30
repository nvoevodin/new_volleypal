




export const getMembers = async (eventId) =>{
    console.log(eventId+'ggg')
  const result = fetch(`${global.x}/get_event_members/${eventId}`)
    .then((res) => res.json())
    .then((res) => {

        console.log(res.data[0]["JSON_EXTRACT(members, '$')"])

     const users = fetch(`${global.x}/get_users/${res.data[0]["JSON_EXTRACT(members, '$')"]}`)
      .then((res) => res.json())
      .then((res) => {
          console.log(res.data)
          
      return res.data
      
      
      }).catch((error) => {
        console.log(error)
      });

      return users
        
    //this.setState({members:JSON.parse(res.data[0]["JSON_EXTRACT(members, '$')"])})
    
    }).catch((error) => {
      console.log(error)
    });
    return result
  }

  export const getWaitlist = (eventId) =>{
    console.log('calling waitlist')
    fetch(`${global.x}/get_event_members/${eventId}`)
    .then((res) => res.json())
    .then((res) => {

      fetch(`${global.x}/get_users/${res.data[0]["JSON_EXTRACT(waiting, '$')"]}`)
      .then((res) => res.json())
      .then((res) => {
         
      //this.setState({waitlist:res.data})
      
      
      }).catch((error) => {
        console.log(error)
      });
        
    //this.setState({members:JSON.parse(res.data[0]["JSON_EXTRACT(members, '$')"])})
    
    }).catch((error) => {
      console.log(error)
    });
  }



  export const joinEvent = async (eventId,user_id) => {
     
    await fetch(
        // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
        `${global.x}/add_event_members?event_id=${eventId}&user_id=${user_id}`,
        { method: "PUT" }
      ).catch((error) => {
        console.log(error)
      })

    alert(`You are in!` )
    
    
  }

  export const leaveEvent = async (eventId,user_id) => {
     
    await fetch(
        // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
        `${global.x}/remove_event_members?event_id=${eventId}&user_id=${user_id}`,
        { method: "PUT" }
      ).catch((error) => {
        console.log(error)
      })
      alert('Left!')
    

  }




  export const addToEvent = (eventId,user_id) => {
    fetch(
       // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
       `${global.x}/remove_from_event_waitlist?event_id=${eventId}&user_id=${user_id}`,
       { method: "PUT" }
     ).catch((error) => {
       console.log(error)
     })

     fetch(
       // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
       `${global.x}/add_event_members?event_id=${eventId}&user_id=${user_id}`,
       { method: "PUT" }
     ).catch((error) => {
       console.log(error)
     })

     //alert('Added!')

     //this.setState({changedState: !this.state.changedState})


   }

   export const removeFromEvent = (eventId,user_id) => {
     fetch(
       // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
       `${global.x}/remove_group_members?group_id=${eventId}&user_id=${user_id}`,
       { method: "PUT" }
     ).catch((error) => {
       console.log(error)
     })
     //alert('Removed!')
     //this.setState({changedState: !this.state.changedState})
   }


