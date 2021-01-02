import { getUserTodos } from "../helpers.js";

const Query = {
  hello: () => "Hello World!",
  todoList: async (parent, args, context) => {
    let { filter } = args;
    const todos = await getUserTodos(context);

    if (filter) {
      filter = RegExp(filter);
      return todos.filter(
        todo => filter.test(todo.title) || filter.test(todo.description)
      );
    }

    return todos;
  },
  user: async (parent, args, context) => {
    const users = await context.models.User.find();
    return users;
  }
};

export default Query;
