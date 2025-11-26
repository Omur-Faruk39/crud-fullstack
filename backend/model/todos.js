import db from "../config/db.js";

const todos = {};

todos.getTodos = (callback) => {
  db.query("SELECT `_id`, `task`, `status` FROM tasks", callback);
};

todos.addTodo = ({ task, status, id }, callback) => {
  db.query(
    "INSERT INTO tasks (`task`, `status`, `_id`) VALUES (?, ?, ?)",
    [task, status, id],
    callback
  );
};

todos.getTodoById = ({ id }, callback) => {
  db.query(
    "SELECT `_id`, `task`, `status` FROM tasks WHERE _id = ?",
    [id],
    callback
  );
};

todos.deleteTodo = ({ id }, callback) => {
  db.query("DELETE FROM tasks WHERE `_id` = ?", [id], callback);
};

todos.updateTodo = ({ id, value }, callback) => {
  if (value.task && value.status) {
    db.query(
      "UPDATE tasks SET task = ?, status = ? WHERE _id = ?",
      [value.task, value.status, id],
      callback
    );
  } else if (value.task) {
    db.query(
      "UPDATE tasks SET task = ? WHERE _id = ?",
      [value.task, id],
      callback
    );
  } else {
    db.query(
      "UPDATE tasks SET status = ? WHERE _id = ?",
      [value.status, id],
      callback
    );
  }
};

export default todos;
