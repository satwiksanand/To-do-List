import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

const ToDoListContext = createContext();

const intialState = {
  todolist: localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [],
  isCreateModalOpen: false,
  isEditModalOpen: false,
  id: localStorage.getItem("id") ? Number(localStorage.getItem("id")) : 0,
  currEdit: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "create-item":
      return {
        ...state,
        todolist: [...state.todolist, { ...action.payload, id: state.id }],
        isCreateModalOpen: false,
        id: state.id + 1,
      };

    case "delete-item":
      return {
        ...state,
        todolist: state.todolist.filter((item) => item.id !== action.payload),
      };

    case "toggle-create":
      return {
        ...state,
        isCreateModalOpen: !state.isCreateModalOpen,
      };

    case "toggle-edit":
      return {
        ...state,
        isEditModalOpen: !state.isEditModalOpen,
        currEdit: {},
      };

    case "edit-item":
      return {
        ...state,
        todolist: state.todolist.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        isEditModalOpen: false,
        currEdit: {},
      };

    case "edit-change-item":
      return {
        ...state,
        isEditModalOpen: true,
        currEdit: action.payload,
      };

    default:
      throw new Error("Unknown action type!");
  }
}

function ToDoListProvider({ children }) {
  const [
    { todolist, isCreateModalOpen, isEditModalOpen, currEdit, id },
    dispatch,
  ] = useReducer(reducer, intialState);

  useEffect(
    function () {
      localStorage.setItem("todo", JSON.stringify(todolist));
    },
    [todolist]
  );

  useEffect(
    function () {
      localStorage.setItem("id", id);
    },
    [id]
  );

  function handleCreate(newItem) {
    dispatch({ type: "create-item", payload: newItem });
  }

  function handleToggleCreateModal() {
    dispatch({ type: "toggle-create", payload: null });
  }

  function handleDeleteToDoItem(id) {
    dispatch({ type: "delete-item", payload: id });
  }

  function handleToggleEditItem() {
    dispatch({ type: "toggle-edit", payload: null });
  }

  function handleEditItem(newItem) {
    dispatch({ type: "edit-item", payload: newItem });
  }

  function handleChangeEditItem(item) {
    dispatch({ type: "edit-change-item", payload: item });
  }

  return (
    <ToDoListContext.Provider
      value={{
        todolist,
        id,
        handleCreate,
        isCreateModalOpen,
        isEditModalOpen,
        handleToggleCreateModal,
        handleDeleteToDoItem,
        handleToggleEditItem,
        handleEditItem,
        handleChangeEditItem,
        currEdit,
      }}
    >
      {children}
    </ToDoListContext.Provider>
  );
}

function useToDoList() {
  const context = useContext(ToDoListContext);
  if (context === undefined) {
    throw new Error("ToDoList consumed outside the provider!");
  }
  return context;
}

ToDoListProvider.propTypes = {
  children: PropTypes.node,
};

export { ToDoListProvider, useToDoList };
