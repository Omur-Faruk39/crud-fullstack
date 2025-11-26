import Joi from "joi";
import todos from "../model/todos.js";
import uId from "../helper/uId.js";

const todoSchema = Joi.object({
  task: Joi.string().min(5).required(),
  status: Joi.string()
    .valid("INCOMPLETE", "COMPLETE", "ONGOING")
    .default("INCOMPLETE")
    .required(),
});

const addTodo = (req, res) => {
  const { error, value } = todoSchema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: "not ok",
      message: "Invalid request body",
      error: error.details[0].message,
    });
  }

  const body = {
    ...value,
    id: uId(),
  };
  todos.addTodo(body, (err, data) => {
    if (err) {
      return res.status(500).send({
        status: "not ok",
        message: "There was a problem updating the database",
        error: err,
      });
    }

    res.status(200).send({
      status: "ok",
      message: "new task added succefully",
      data: body,
    });
  });
};

export default addTodo;
