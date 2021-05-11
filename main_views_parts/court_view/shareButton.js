import React from "react";
import { Platform,Share, View, Button } from "react-native";

const onShare = async (type) => {
  try {
    const result = await Share.share(Platform.OS === "android"?{
      
      message: `${"I am on VolleyPal. Check it out. https://volleypal.site/"}`
      
    }:{
      message: `${"I am on VolleyPal. Check it out."}`,
      url: "https://volleypal.site/"
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
