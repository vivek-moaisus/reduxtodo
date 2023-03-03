import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CreateTask from "./CreateTask";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../action";
import ReactPaginate from "react-paginate";
import "./Todo.css";

function Todo() {
  const [modal, setModal] = useState(false);
  const query = useSelector((state) => state.reducers.tasklist);
  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="bg-gradient bg-secondary header">
        <div className="container-fluid p-4">
          <h3 className="text-white text-center">Todo List</h3>
          <div className="row mt-2">
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center">
              <button
                className="btn btn-light w-50"
                onClick={() => setModal(true)}
              >
                Create Task
              </button>
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="Type to search..."
                // onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 d-flex d-flex justify-content-center">
              <select
                id="inputState"
                className="form-select w-50"
                // value={change}
                // onChange={(e) => setChange(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Complete">Complete</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 d-flex d-flex justify-content-start">
              <select
                className="form-select w-50"
                // value={listPerPage}
                // onChange={(e) => setListPerPage(parseInt(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="task-container">
        {query.map((taskObj) => {
          return (
            <div className="container" key={taskObj.id}>
              <div className="row justify-content-center mt-3">
                <div className="col-12 col-lg-8 col-xl-6">
                  <div className="card border-0 shadow">
                    <div className="p-3">
                      <div className="bg-gradient bg-secondary p-2 text-white rounded text-cente w-25">
                        {taskObj.data}
                      </div>
                      <p className="p-2 text-start">{taskObj.status}</p>
                      <div className="text-end">
                        <FiEdit
                          className="edit-icon"
                          onClick={() => setModal(true)}
                        />
                        <MdDelete
                          className="delete-icon"
                          onClick={() => dispatch(deleteTodo(taskObj.id))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <UpdateTask /> */}
            </div>
          );
        })}
        {/* {query
          .filter((obj) => obj.TaskName.toLowerCase().includes(search))
          .splice(skip, listPerPage)
          .map((obj, index) => (
            <Card
              key={TodoList.id}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArr={updateListArr}
              stsFilter={stsFilter}
            />
          ))} */}
      </div>
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={10}
        // onPageChange={handelPageClick}
        containerClassName={"pagination justify-content-center mt-3"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      <CreateTask toggle={toggle} modal={modal} />
    </>
  );
}

export default Todo;
