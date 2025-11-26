import todos from "../model/todos.js";

const getTodos = (req, res) => {
  todos.getTodos((err, data) => {
    if (err) {
      res.status(500).send({
        status: "not ok",
        message: "there have some problem to getting data from database",
        error: err,
      });
    } else {
      res.status(200).send({
        status: "ok",
        data: data,
      });
    }
  });
};

export default getTodos;
