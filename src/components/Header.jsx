import { useToDoList } from "../Context/ToDoListContext";

function Header() {
  const { handleToggleCreateModal } = useToDoList();

  return (
    <>
      <header className="header">
        <h1>Ninja's ToDo List</h1>
        <button className="create-task" onClick={handleToggleCreateModal}>
          Create Task
        </button>
      </header>
    </>
  );
}

export default Header;
