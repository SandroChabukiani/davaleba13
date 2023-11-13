import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoList from "./TodoList";
const App = () => {
  const todoTaskRef = useRef();
  const [todoTask, setTodoTask] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, task: "Tarea", completed: false },
  ]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleTodoAdd = (event) => {
    const task = todoTaskRef.current.value;
    if (task === "") return;

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), task, completed: false },
    ]);

    todoTaskRef.current.value = "";
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <ToDoListMemoized todos={todos} toggleTodo={toggleTodo} />
      <input
        ref={todoTaskRef}
        type="text"
        placeholder="input"
        value={todoTask}
        onChange={(e) => setTodoTask(e.target.value)}
      />
      <button onClick={handleTodoAdd}>submit</button>
      <button onClick={handleClearAll}>remove</button>
      <div>To Do: {todos.filter((todo) => !todo.completed).length}</div>
    </Fragment>
  );
};

export default App;