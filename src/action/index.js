export const addTodo = (data, status) => {
  return {
    type: "ADD_TODO",
    payload: {
      id: new Date().getTime().toString(),
      data: data,
      status:status
    }
  };
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    id
  };
};

export const updateTodo = () => {
  return {
    type: "UPDATE_TODO",
  };
};
