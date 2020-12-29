const Query = {
  hello: () => "Hello World!",
  todoList: async (parent, args, context) => {
    const todos = await context.Todo.find();
    return todos;
  },
  user: async (parent, args, context) => {
    const users = await context.User.find();
    return users;
  }
};

export default Query;
