import React from "react";
import { Share, View, Button } from "react-native";

const onShare = async (name) => {
  try {
    const result = await Share.share({
      message:
        "Hey, I am arranging a game through the VolleyPal app! Download it so I can add you too!",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export default onShare;
