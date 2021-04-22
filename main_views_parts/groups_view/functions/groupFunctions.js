import { Alert } from "react-native";

export const getGroups = (playgroundId) => {
  let fetchResult = fetch(`${global.x}/get_groups/${playgroundId}`)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return fetchResult;
};

export const deleteGroup = (group_id) => {
  fetch(
    // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
    `${global.x}/deleteGroup?group_id=${group_id}`,
    { method: "DELETE" }
  ).catch((error) => {
    console.log(error);
  });
};

export const joinGroup = async (user_id, group_id) => {
  await fetch(
    // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
    `${global.x}/add_group_members?group_id=${group_id}&user_id=${user_id}`,
    { method: "PUT" }
  ).catch((error) => {
    console.log(error);
  });
};

export const requestToJoin = async (user_id, group_id) => {
  await fetch(
    // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
    `${global.x}/add_to_waitlist?group_id=${group_id}&user_id=${user_id}`,
    { method: "PUT" }
  ).catch((error) => {
    console.log(error);
  });
};

export const leaveGroup = async (user_id, group_id) => {
  await fetch(
    // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
    `${global.x}/remove_group_members?group_id=${group_id}&user_id=${user_id}`,
    { method: "PUT" }
  ).catch((error) => {
    console.log(error);
  });
};

export const requested = () => {
  alert("Already requested! Wait for admin to approve you!");
};
