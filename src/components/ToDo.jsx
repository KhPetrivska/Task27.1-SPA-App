import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../units/ThemeContext";
import "./todo.css";
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

const MIN_TEXT_LENGTH = 5;

const ToDo = () => {
  const { mode } = useContext(ThemeContext);

  const [taskStorage, setTaskStorage] = useState(() => {
    return JSON.parse(localStorage.getItem("TaskList")) || [];
  });

  useEffect(() => {
    localStorage.setItem("TaskList", JSON.stringify(taskStorage));
  }, [taskStorage]);

  const generateTaskBlock = (text, check) => {
    const newTask = { id: Date.now(), task: text, completed: check };
    setTaskStorage((prev) => [newTask, ...prev]);
  };

  const validate = (values) => {
    const errors = {};
    if (values.text.length < MIN_TEXT_LENGTH) {
      errors.text = `Task must be at least ${MIN_TEXT_LENGTH} characters long`;
    }
    return errors;
  };

  const onSubmit = (values, { resetForm }) => {
    generateTaskBlock(values.text, false);
    resetForm();
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
      <Formik
        initialValues={{ text: "" }}
        validate={validate}
        onSubmit={onSubmit}
      >
        <Form >
          <div className="form js--form">
            <Field
              type="text"
              name="text"
              className="form__input js--form__input"
            />
              <button type="submit" className="form__btn">
                Add
              </button>
          </div>
          <ErrorMessage name="text" component="div" className="form-error" />
        </Form>
      </Formik>
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
