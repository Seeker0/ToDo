import { getUserTodos } from "../helpers.js";

const Query = {
  hello: () => "Hello World!",
  todoList: async (parent, args, context) => {
    const todos = await getUserTodos(context);

    return todos;
  },
  user: async (parent, args, context) => {
    const users = await context.models.User.find();
    return users;
  }
};

export default Query;
