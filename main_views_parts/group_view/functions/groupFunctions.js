export const getMembers = (id) => {
  var result = fetch(`${global.x}/get_group_members/${id}`)
    .then((res) => res.json())
    .then((res) => {
      const data = fetch(
        `${global.x}/get_users/${res.data[0]["JSON_EXTRACT(members, '$')"]}`
      )
        .then((res) => res.json())
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      return data;
      //this.setState({members:JSON.parse(res.data[0]["JSON_EXTRACT(members, '$')"])})
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
};

export const getPlayers = async (playgroundId) => {
  var checks = await fetch(`${global.x}/players/${playgroundId}`)
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

  return [checks, prechecks];
};

export const getWaitlist = (id) => {
  var result = fetch(`${global.x}/get_group_members/${id}`)
    .then((res) => res.json())
    .then((res) => {
      var waiting = fetch(
        `${global.x}/get_users/${res.data[0]["JSON_EXTRACT(waiting, '$')"]}`
      )
        .then((res) => res.json())
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      return waiting;
      //this.setState({members:JSON.parse(res.data[0]["JSON_EXTRACT(members, '$')"])})
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

export const getInvited = (id) => {
  var result = fetch(`${global.x}/get_group_members/${id}`)
    .then((res) => res.json())
    .then((res) => {
      var invited = fetch(
        `${global.x}/get_users/${res.data[0]["JSON_EXTRACT(invited, '$')"]}`
      )
        .then((res) => res.json())
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });

      return invited;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

export const addToGroup = (groupId, userId, changeState) => {
  fetch(
    // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
    `${global.x}/remove_from_waitlist?group_id=${groupId}&user_id=${userId}`,
    { method: "PUT" }
  ).catch((error) => {
    console.log(error);
  });

  fetch(
    // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
    `${global.x}/add_group_members?group_id=${groupId}&user_id=${userId}`,
    { method: "PUT" }
  ).catch((error) => {
    console.log(error);
  });

  alert("Added!");

  changeState;
};

export const removeFromGroup = (groupId, userId, changeState) => {
  fetch(
    // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
    `${global.x}/remove_group_members?group_id=${groupId}&user_id=${userId}`,
    { method: "PUT" }
  ).catch((error) => {
    console.log(error);
  });
  alert("Removed!");
  changeState;
};

export const sendInvite = (groupId, userId, closePrompt) => {
  fetch(
    // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
    `${global.x}/invite_group_members?group_id=${groupId}&user_id=${userId}`,
    { method: "PUT" }
  ).catch((error) => {
    console.log(error);
  });

  alert("Invited!");

  closePrompt;
};
