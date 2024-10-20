import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../units/ThemeContext";
import "./todo.css";
import "../App.css";

const ToDo = () => {
  const { mode } = useContext(ThemeContext);

  const [taskStorage, setTaskStorage] = useState(() => {
    return JSON.parse(localStorage.getItem("TaskList")) || [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("TaskList", JSON.stringify(taskStorage));
  }, [taskStorage]);

  const generateTaskBlock = (text, check) => {
    const newTask = { id: Date.now(), task: text, completed: check };
    setTaskStorage((prev) => [...prev, newTask]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      alert("Empty input cannot be submitted");
      return;
    }
    generateTaskBlock(inputValue, false);
    setInputValue("");
  };

  const handleDelete = (id) => {
    setTaskStorage((prev) => prev.filter((task) => task.id !== id));
  };

  const handleCheckboxClick = (id) => {
    setTaskStorage((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className={`container ${mode}`}>
      <h1 className="todo-title">Task List 💯🚀🎯</h1>
      <form className="form js--form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="value"
          required
          className="form__input js--form__input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="form__btn">Add</button>
      </form>
      <ul className="js--todos-wrapper">
        {taskStorage.map(({ id, task, completed }) => (
          <TodoItem
            key={id}
            id={id}
            task={task}
            completed={completed}
            onDelete={handleDelete}
            onCheckboxClick={handleCheckboxClick}
          />
        ))}
      </ul>
    </div>
  );
};

const TodoItem = ({ id, task, completed, onDelete, onCheckboxClick }) => {
  return (
    <li className={`todo-item ${completed ? "todo-item--checked" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onCheckboxClick(id)}
      />
      <span className="todo-item__description">{task}</span>
      <button className="todo-item__delete" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};
export default ToDo;
