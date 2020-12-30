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

    const newTodo = await context.models.Todo.create({ ...todo });
    return newTodo;
  },

  deleteTodo: async (parent, args, context) => {
    const todo = await context.models.Todo.findByIdAndDelete(args.id);
    return todo;
  },

  updateTodo: async (parent, args, context) => {
    const todoToRemove = await context.models.Todo.findByIdAndUpdate(args.id, {
      ...args
    });
    return todoToRemove;
  },

  login: async (parent, args, context) => {
    const user = await context.models.User.findOne({ email: args.email });
    if (!user) return "Invalid email address";

    const validUser = await bcrypt
      .compare(args.password, user.password)
      .then(res => {
        return res;
      });

    if (!validUser) return "Invalid Password";

    const id = await bcrypt.hash(args.email, saltRounds);
    const token = await context.models.Token.create({
      _id: id,
      user: user._id
    });
    return token;
  },

  signup: async (parent, args, context) => {
    const pwHash = await bcrypt
      .hash(args.password, saltRounds)
      .then(res => res);
    const newUser = await context.models.User.create({
      email: args.email,
      password: pwHash
    });
    const id = await bcrypt.hash(args.email, saltRounds);
    const token = await context.models.Token.create({
      _id: id,
      user: newUser._id
    });
    return token;
  },

  logout: async (parent, args, context) => {
    const session = await context.models.Token.findByIdAndDelete(
      context.user.session
    );
    return "Logout Successful";
  }
};

export default Mutation;
