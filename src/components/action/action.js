export const addToken = (token) => {
  return {
    type: "ADD_TOKEN",
    payload: {
      token: token,
    },
  };
};
export const removeToken = () => {
  return {
    type: "REMOVE_TOKEN",
  };
};
export const removeData = () => {
  return {
    type: "REMOVE_DATA",
  };
};
export const addUserInfo = (values) => {
  return {
    type: "ADD_USER_INFO",
    payload: {
      values: values,
    },
  };
};
export const updateUserInfo = (values) => {
  return {
    type: "UPDATE_USER_INFO",
    payload: {
      values: values,
    },
  };
};
export const updateDate = (values) => {
  return {
    type: "UPDATE_DATE",
    payload: {
      values: values,
    },
  };
};
export const updateTodo = (values) => {
  return {
    type: "UPDATE_TODO",
    payload: {
      values: values,
    },
  };
};
export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
  };
};
export const searchTodos = (values) => {
  return {
    type: "SEARCH_TODOS",
    payload: {
      values: values,
    },
  };
};
export const currentPage = (values) => {
  return {
    type: "CURRENT_PAGE",
    payload: {
      values: values,
    },
  };
};
