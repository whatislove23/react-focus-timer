export const addTodo = (newTodo) => {
  return (dispatch) => {
    dispatch({ type: "ADD_TODO", newTodo });
  };
};
export const removeTodo = (id, uid) => {
  return (dispatch) => {
    dispatch({ type: "REMOVE_TODO", id, uid });
  };
};
export const updateToDo = (id, isActive, userId) => {
  return (dispatch) => {
    dispatch({ type: "UPDATE_TODO", id, isActive: isActive, userId });
  };
};
