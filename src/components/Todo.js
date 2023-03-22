import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CreateTask from "./CreateTask";
import "./Todo.css";
import { useState } from "react";
import Card from "./Card";
// import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { filterdlist, searchtodo } from "../reducer/reducers";

function Todo() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const filter = useSelector((state) => state.item.filterList);

  const handelFilter = (e) => {
    dispatch(filterdlist(e.target.value));
  };

  const handelSearch = (e) =>{
    dispatch(searchtodo(e.target.value))
  }

  const toggle = () => setModal(!modal);

  return (
    <>
      <div className="bg-gradient bg-secondary header">
        <div className="container-fluid p-3">
          <h2 className="text-white text-center">Todo List</h2>
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
                onChange={handelSearch}
              />
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 d-flex d-flex justify-content-center">
              <select
                id="inputState"
                className="form-select w-50"
                value={filter}
                onChange={handelFilter}
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
        <Card/>
        {/* <Pagination count={10} className="mt-3" /> */}
      </div>
      <CreateTask type="add" modal={modal} toggle={toggle} />
    </>
  );
}

export default Todo;
