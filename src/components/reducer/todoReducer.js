const intialData = {
  todo: {},
  data: [],
  page: 1,
};
const profileRducers = (state = intialData, action) => {
  switch (action.type) {
    case "UPDATE_TODO":
      return { ...state, todo: action.payload.values };
    case "DELETE_TODO":
      return {
        ...state,
        todo: { title: "", id: "" },
      };
    case "SEARCH_TODOS":
      return { ...state, data: action.payload.values };
    case "CURRENT_PAGE":
      return { ...state, page: action.payload.values };
    default:
      return state;
  }
};
export default profileRducers;
