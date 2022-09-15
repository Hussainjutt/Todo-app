const intialData = {
  data: [],
  page: 1,
};
const profileRducers = (state = intialData, action) => {
  switch (action.type) {
    case "SEARCH_TODOS":
      return { ...state, data: action.payload.values };
    case "CURRENT_PAGE":
      return { ...state, page: action.payload.values };
    default:
      return state;
  }
};
export default profileRducers;
