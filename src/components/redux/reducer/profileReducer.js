const intialData = {
  token: "",
  userInfo: {},
};
const profileRducers = (state = intialData, action) => {
  switch (action.type) {
    case "ADD_TOKEN":
      return {
        ...state,
        token: action.payload.token,
      };
    case "REMOVE_TOKEN":
      return {
        ...state,
        token: "",
      };
    case "ADD_USER_INFO":
      return { ...state, userInfo: action.payload.values };
    case "REMOVE_DATA":
      return { ...state, userInfo: {}, dateOfBirth: "" };
    default:
      return state;
  }
};
export default profileRducers;
