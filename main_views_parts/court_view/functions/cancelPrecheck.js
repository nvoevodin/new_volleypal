const cancelPrecheck = async (playgroundId, uid) => {
  Alert.alert(
    "Cancel Your Pre-CheckIn?",
    "",
    [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await fetch(
            // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
            `${global.x}/cancelPreCheck?site_id=${playgroundId}&user_id=${uid}`,
            { method: "DELETE" }
          ).catch((error) => {
            console.log(error);
          });

          alert("You canceled your pre-check.");
          return false;
        },
      },
    ],
    { cancelable: false }
  );
};
