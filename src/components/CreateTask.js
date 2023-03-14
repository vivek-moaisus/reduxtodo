import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../reducer/reducers";

function CreateTask({ type, modal, toggle, item }) {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("Incomplete");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && item) {
      setTaskName(item.taskName);
      setStatus(item.status);
    } else {
      setTaskName("");
      setStatus("Incomplete");
    }
  }, [type, item, modal]);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (taskName && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            taskName,
            status,
            time: new Date().toLocaleString(),
          })
        );
      }
      if (type === "update") {
        if (item.taskName !== taskName || item.status !== status) {
          dispatch(
            updateTodo({
              ...item,
              taskName,
              status,
            })
          );
        }
      }
      toggle(false);
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {type === "update" ? "Update" : "Add"} Task
        </ModalHeader>
        <ModalBody>
          <Formik>
            <Form>
              <div className="from-group">
                <label for="taskname">Taks Name</label>
                <Field
                  type="text"
                  className="form-control"
                  name="taskName"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div className="from-group">
                <label for="taskname">Status</label>
                <select
                  type="text"
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option disabled></option>
                  <option value="Incomplete">Incomplete</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
            </Form>
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handelSubmit(e)}>
            {type === "update" ? "Update" : "Add"} Task
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateTask;
