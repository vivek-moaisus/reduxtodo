const initialData = {
  tasklist: [],
};

const reducers = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const { id, data, status } = action.payload;
      return {
        ...state,
        tasklist: [
          ...state.tasklist,
          {
            id: id,
            data: data,
            status: status,
          },
        ],
      };

    case "DELETE_TODO":
      const tmpList = state.tasklist.filter(
        (taskObj) => taskObj.id !== action.id
      );
      return {
        ...state,
        tasklist: tmpList,
      };

    default:
      return state;
  }
};

export default reducers;
