import { nanoid } from "nanoid";
import todos from "../model/todos.js";

const uId = () => {
  const id = nanoid(8);
  let exist = true;

  todos.getTodoById({ id: id }, (err, value) => {
    while (exist) {
      if (!err && value.length === 0) {
        exist = false;
      }
    }
  });

  return id;
};

export default uId;
