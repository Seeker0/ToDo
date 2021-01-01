const Query = {
  hello: () => "Hello World!",
  todoList: async (parent, args, context) => {
    const todos = await context.models.Todo.find();
    console.log(todos);
    return todos;
  },
  user: async (parent, args, context) => {
    const users = await context.models.User.find();
    return users;
  }
};

export default Query;
