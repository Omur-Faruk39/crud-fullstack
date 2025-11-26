import Joi from "joi";
import todos from "../model/todos.js";

const schema = Joi.object({
  id: Joi.string().length(8).required(),
  value: Joi.object({
    task: Joi.string().min(5).optional(),
    status: Joi.string()
      .valid("INCOMPLETE", "COMPLETE", "ONGOING")
      .default("INCOMPLETE")
      .optional(),
  }).required(),
});

const updateTodo = (req, res) => {
  const { err, value } = schema.validate(req.body);

  if (err) {
    res.status(400).send({
      status: "not ok",
      message: "there have some problem in reqest body",
      error: err,
    });
  }

  todos.updateTodo(value, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "not ok",
        message: "there have some problem for update data in database",
        error: err,
      });
    } else {
      res.status(201).send({
        status: "ok",
        message: "data update succefully",
        data: [],
      });
    }
  });
};

export default updateTodo;
