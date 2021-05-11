import { combineReducers } from "redux";

const INITIAL_STATE = {
  signedIn: false,
  playgroundName: "",
  playgroundCity: "",
  playgroundId: "",
  playgroundLat: null,
  playgroundLon: null,
  playgroundImage: "",
  playgroundDescription: "",
  playgroundPhone: "",
  playgroundType: "",
  playgroundSurface: "",
  playgroundDistance: 0,
  playgroundDefault: "",
  preCheckModal: false,
  eventTimeModal: false,
  eventTime: "",
  eventDateModal: false,
  eventDate: "",
  anonymous: false,
  preCheckStatus: false,
  userInfo: [],
  eventInfo: "",
  groupInfo: [],
  queueCourtInfo: [],
  createGroupTrigger: true,
  lastEventsRefresh: 0,
  courtListTrigger: true,
  lastCourtListRefresh: 0

};

const ourReducer = (state = INITIAL_STATE, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "STORE_COURT_LIST_REFRESH":
      return {
        ...state,
        courtListTrigger: action.value,
        lastCourtListRefresh: action.value1,
      };
      break;

    case "STORE_LAST_EVENTS_REFRESH":
      return {
        ...state,
        lastEventsRefresh: action.value,
      };
      break;

    case "CREATE_GROUP_TRIGGER":
      return {
        ...state,
        createGroupTrigger: action.value,
      };
      break;

    case "SET_ANONYMOUS":
      return {
        ...state,
        anonymous: action.value,
      };
      break;

    case "SET_USER_DATA":
      return {
        ...state,
        userInfo: action.value,
      };
      break;

    case "SET_GROUP_INFO":
      return {
        ...state,
        groupInfo: action.value,
      };
      break;
    case "STORE_USER_STATUS":
      return {
        ...state,
        signedIn: action.value,
      };
      break;

    case "STORE_PLAYGROUND":
      return {
        ...state,
        playgroundName: action.value,
        playgroundId: action.value1,
        playgroundLat: action.value2,
        playgroundLon: action.value3,
        playgroundImage: action.value4,
        playgroundDescription: action.value5,
        playgroundPhone: action.value6,
        playgroundType: action.value7,
        playgroundSurface: action.value8,
        playgroundDistance: action.value9,
        playgroundCity: action.value10,
        playgroundDefault: action.value11,
      };
      break;

    case "STORE_QUEUE_PLAYGROUND":
      return {
        ...state,
        queueCourtInfo: action.value,
      };
      break;
    case "STORE_PRECHECK":
      return {
        ...state,

        preCheckStatus: action.value,
      };
      break;
    case "CANCEL_PRECHECK":
      return {
        ...state,

        preCheckStatus: action.value,
      };

      break;
    case "TOGGLE_TIMER_MODAL":
      return {
        ...state,
        preCheckModal: action.value,
      };

      break;
    case "TOGGLE_EVENTTIME_MODAL":
      return {
        ...state,
        eventTimeModal: action.value,
      };

      break;
    case "TOGGLE_EVENTDATE_MODAL":
      return {
        ...state,
        eventDateModal: action.value,
      };
      break;
    case "SET_EVENTTIME":
      return {
        ...state,
        eventTime: action.value,
      };

      break;
    case "SET_EVENTDATE":
      return {
        ...state,
        eventDate: action.value,
      };

      break;
    case "STORE_EVENT_INFO":
      return {
        ...state,
        eventInfo: action.value,
      };
  }
  return newState;
};

export default combineReducers({
  reducer: ourReducer,
});
