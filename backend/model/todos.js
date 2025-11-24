import db from "../config/db.js";

const todos = {};

todos.getTodos = (callback) => {
  db.query("SELECT * FROM tasks", callback);
};

export default todos;
