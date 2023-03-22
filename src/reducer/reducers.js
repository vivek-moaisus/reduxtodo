import { createSlice } from "@reduxjs/toolkit";

const getInitialList = () => {
  const localList = window.localStorage.getItem("tasklist");
  if (localList) {
    return JSON.parse(localList);
  }
  window.localStorage.setItem("tasklist", JSON.stringify([]));
  return [];
};

const initialData = {
  filterList: "All",
  search:[],
  tasklist: getInitialList(),
};

export const listSlice = createSlice({
  name: "task",
  initialState: initialData,
  reducers: {
    addTodo: (state, action) => {
      state.tasklist.push(action.payload);
      const tasklist = window.localStorage.getItem("tasklist");
      if (tasklist) {
        const taskListArr = JSON.parse(tasklist);
        taskListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem("tasklist", JSON.stringify(taskListArr));
      } else {
        window.localStorage.setItem(
          "tasklist",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTodo: (state, action) => {
      const tasklist = window.localStorage.getItem("tasklist");
      if (tasklist) {
        const taskListArr = JSON.parse(tasklist);
        taskListArr.forEach((item, index) => {
          if (item.id === action.payload) {
            taskListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("tasklist", JSON.stringify(taskListArr));
        state.tasklist = taskListArr;
      }
    },
    updateTodo: (state, action) => {
      const tasklist = window.localStorage.getItem("tasklist");
      if (tasklist) {
        const taskListArr = JSON.parse(tasklist);
        taskListArr.forEach((item) => {
          if (item.id === action.payload.id) {
            item.taskName = action.payload.taskName;
            item.status = action.payload.status;
          }
        });
        window.localStorage.setItem("tasklist", JSON.stringify(taskListArr));
        state.tasklist = [...taskListArr];
      }
    },
    filterdlist: (state, action) => {
      state.filterList = action.payload;
    },
    searchtodo: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, filterdlist, searchtodo } =
  listSlice.actions;
export default listSlice.reducer;
