//this modal is used for creating a new task, necessarily this modal will show when the user clicks the create task button.

import { useState } from "react";
import Button from "../components/Button";
import { useToDoList } from "../Context/ToDoListContext";

//! it is the defualt functionalities of a form element in html that whenever a button is pressed, the form gets submitted.

function CreateTask() {
  //doesn't matter if you use form or not this components has its own state and that is to contain the values of the title and description.

  //? here we will use the todolist context to and yes we will have to define a function to create a new task and update it in the context, so that then it can be rendered in the to do list js file.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { handleCreate, isCreateModalOpen, handleToggleCreateModal, todolist } =
    useToDoList();

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleTask(e) {
    setTitle(e.target.value);
  }

  function handleCreateSubmit(e) {
    e.preventDefault();
    if (!title || !description) {
      return;
    }
    setTitle("");
    setDescription("");
    handleCreate({ id: todolist.length - 1, title: title, desc: description });
  }

  function handleCancelSubmit(e) {
    e.preventDefault();
    setTitle("");
    setDescription("");
    handleToggleCreateModal();
  }

  return isCreateModalOpen ? (
    <div className="modal-container">
      <div className="title">
        Create Task{" "}
        <span onClick={() => handleToggleCreateModal()}>&times;</span>
      </div>
      <hr />
      <form className="modal-form">
        <label>Task Name</label>
        <input type="text" value={title} onChange={(e) => handleTask(e)} />
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => handleDescription(e)}
        ></textarea>
        <hr />
        <Button
          classNameProp="create"
          handleClick={(e) => handleCreateSubmit(e)}
        >
          Create
        </Button>
        <Button
          classNameProp="cancel"
          handleClick={(e) => handleCancelSubmit(e)}
        >
          Cancel
        </Button>
      </form>
    </div>
  ) : (
    <></>
  );
}

export default CreateTask;
