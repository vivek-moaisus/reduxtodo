import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../action";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function CreateTask({ modal, toggle }) {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("");
  const dipatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else {
      setStatus(value);
    }
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Task</ModalHeader>
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
                  onChange={handleChange}
                />
              </div>
              <div className="from-group">
                <label for="taskname">Status</label>
                <select
                  type="text"
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={handleChange}
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
          <Button
            color="primary"
            onClick={() =>
              dipatch(addTodo(taskName, status), setTaskName(""), setStatus(""))
            }
            type="submit"
            modal={false}
          >
            Save
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
