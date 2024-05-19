//! there is some issue in resolving the initial state of the title and description.

import { useEffect, useState } from "react";
import { useToDoList } from "../Context/ToDoListContext";
import Button from "../components/Button";

function EditTask() {
  const { handleToggleEditItem, isEditModalOpen, currEdit, handleEditItem } =
    useToDoList();

  const [title, setTitle] = useState(() => {
    return currEdit.title;
  });
  const [description, setDescription] = useState(() => {
    return currEdit.desc;
  });

  useEffect(
    function () {
      setTitle(currEdit.title);
      setDescription(currEdit.desc);
    },
    [currEdit]
  );

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
    handleEditItem({ id: currEdit.id, title: title, desc: description });
  }

  function handleCancelSubmit(e) {
    e.preventDefault();
    handleToggleEditItem();
  }

  return isEditModalOpen ? (
    <div className="modal-container">
      <div className="title">
        Edit Task <span onClick={() => handleToggleEditItem()}>&times;</span>
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
        <Button classNameProp="edit" handleClick={(e) => handleCreateSubmit(e)}>
          Edit
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

export default EditTask;
