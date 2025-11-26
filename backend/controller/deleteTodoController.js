import Joi from "joi";
import todos from "../model/todos.js";

const schrema = Joi.object({
  id: Joi.string().length(8),
});

const deleteTodo = (req, res) => {
  const { error, value } = schrema.validate(req.body);

  if (error) {
    res.status(400).send({
      status: "not ok",
      message: "there have some in you request body",
      error: error,
    });
  }

  todos.deleteTodo(value, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "not ok",
        message: "there have some problem to delete data from database",
        error: err,
      });
    } else {
      res.status(200).send({
        status: "ok",
        message: "task delete succefully",
        data: [],
      });
    }
  });
};

export default deleteTodo;
