import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import {FcTodoList} from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../reducer/reducers";
import CreateTask from "./CreateTask";
const Card = (item) => {
  const tasklist = useSelector((state) => state.item.tasklist);
  const sortList = [...tasklist];
  sortList.sort((a, b) => new Date(b.time) - new Date(a.time));
  const [updateModal, setUpdateModal] = useState(false);
  const toggle = () => setUpdateModal(!updateModal);
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.item.filterList);
  const filterTaskList = sortList.filter((item) => {
    if (filter === "All") {
      return true;
    }
    return item.status === filter;
  });

  const searchList = useSelector((state) => state.item.search);
  const searchTodo = filterTaskList.filter((item) =>
    item.taskName.toLowerCase().includes(searchList)
  );

  const handelDelete = () => {
    dispatch(deleteTodo(item.id));
  };
  const handelUpdate = () => {
    setUpdateModal(true);
  };

  return (
    <>
      <div className="container">
        {searchTodo && searchTodo.length > 0 ? (
          searchTodo
          .map((item) => (
            <div className="row justify-content-center mt-3">
              <div className="col-12 col-lg-8 col-xl-6">
                <div className="card border-0 shadow">
                  <div className="p-3" key={item.id}>
                    <div className="p-2 text-start bg-gradient bg-secondary w-25 rounded text-white">
                     <FcTodoList className="edit-icon"/> {item.taskName}
                    </div>
                    <p className="text-start p-1">{item.status}</p>
                    <p className="text-start">{item.time}</p>
                    <div className="text-end">
                      <FiEdit className="edit-icon" onClick={handelUpdate} />
                      <MdDelete
                        className="delete-icon"
                        onClick={handelDelete}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3>No TodoList Here!</h3>
        )}
      </div>
      <CreateTask
        type="update"
        item={item}
        modal={updateModal}
        toggle={toggle}
      />
    </>
  );
};

export default Card;
