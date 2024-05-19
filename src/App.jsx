//first we will create it as coding ninjas want it to.
import { ToDoListProvider } from "./Context/ToDoListContext";
import Header from "./components/Header";
import CreateTask from "./modals/CreateTask";
import ToDoList from "./components/ToDoList";
import EditTask from "./modals/EditTask";

function App() {
  return (
    <ToDoListProvider>
      <div>
        <Header />
        <CreateTask />
        <EditTask />
        <ToDoList />
      </div>
    </ToDoListProvider>
  );
}

export default App;
