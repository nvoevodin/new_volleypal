
export const preCheckedInCheck = async (uid,playgroundId) => {
    var result = fetch(`${global.x}/precheckcheck/${uid}`)
      .then(res => res.json())
      .then(res => {

        if (res["data"].some(e => e.site_id === playgroundId)) {
          return true

        } else {
          return false

        }
      })
      .catch((error) => {
        console.log(error)
      });

      return result
      
  }