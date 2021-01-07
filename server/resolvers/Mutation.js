import bcrypt from "bcrypt";
const saltRounds = 10;

const Mutation = {
  addTodo: async (parent, args, context) => {
    const todo = {
      title: args.title,
      description: args.description || null,
      enteredOn: new Date().toLocaleDateString("en-US"),
      completeBy: args.completeBy || null,
      completed: false,
      urgent: args.urgent || false
    };

    const newTodo = await context.Todo.create({ ...todo });
    return newTodo;
  },
  deleteTodo: async (parent, args, context) => {
    const todo = await context.Todo.findByIdAndDelete(args.id);
    return todo;
  },
  updateTodo: async (parent, args, context) => {
    const todoToRemove = await context.Todo.findByIdAndUpdate(args.id, {
      ...args
    });
    return todoToRemove;
  },
  login: async (parent, args, context) => {
    const user = await context.User.findOne({ email: args.email });
    if (!user) return "Invalid email address";
    const validUser = await bcrypt
      .compare(args.password, user.password)
      .then(res => res);
    if (validUser) {
      context.user = user._id;
      console.log(context.user);
      return user;
    }
    return "Invalid Password";
  },
  signup: async (parent, args, context) => {
    const pwHash = await bcrypt
      .hash(args.password, saltRounds)
      .then(res => res);
    const newUser = await context.User.create({
      email: args.email,
      password: pwHash
    });
    return newUser;
  },
  logout: (parent, args, context) => {
    context.user = null;
    return "Logout Successful";
  }
};

export default Mutation;
