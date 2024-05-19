import { useToDoList } from "../Context/ToDoListContext";
import Card from "./Card";

function ToDoList() {
  const { todolist, handleDeleteToDoItem, handleChangeEditItem } =
    useToDoList();

  return (
    <div className="task-container">
      {todolist.map((item, ind) => (
        <Card
          item={item}
          key={ind}
          color={ind & 1 ? "purple" : ind % 4 === 0 ? "red" : "green"}
          handleDeleteToDoItem={handleDeleteToDoItem}
          handleChangeEditItem={handleChangeEditItem}
        />
      ))}
    </div>
  );
}

export default ToDoList;
