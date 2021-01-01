import bcrypt from "bcrypt";
const saltRounds = 10;
import { getToken, getUser, generate, verify } from "../helpers.js";

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

    const user = await getUser(context);
    const newTodo = await context.models.Todo.create({ ...todo });
    user.todos.push(newTodo._id);
    await user.save();
    return newTodo;
  },

  deleteTodo: async (parent, args, context) => {
    const user = await getUser(context);
    const todo = await context.models.Todo.findByIdAndDelete(args.id);
    const index = user.todos.findIndex(todo._id);

    const userTodos = user.todos.slice();
    usetTodos.splice(index, 1);
    user.todos = userTodos;
    await user.save();
    return todo;
  },

  updateCompleted: async (parent, args, context) => {
    const updatedTodo = await context.models.Todo.findByIdAndUpdate(args.id, {
      completed: args.completed
    });
    console.log(args);
    console.log(updatedTodo);
    return updatedTodo;
  },

  updateUrgent: async (parent, args, context) => {
    const updatedTodo = await context.models.Todo.findByIdAndUpdate(args.id, {
      urgent: args.urgent
    });
    console.log(args);
    console.log(updatedTodo);
    return updatedTodo;
  },

  login: async (parent, args, context) => {
    const user = await context.models.User.findOne({ email: args.email });

    if (!user) throw new Error("No user under the given email found.");

    const validUser = verify(args.password, user.password);

    if (!validUser) throw new Error("Invalid Password");

    const token = await context.models.Token.findOrCreate(user._id, args.email);
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
    let auth = context.req.get("authorization");
    const token = await context.models.Token.findByIdAndDelete(auth);
    const loggedOutToken = {
      _id: token._id,
      user: token.user,
      message: "Logged out successfully"
    };
    console.log(loggedOutToken);
    return loggedOutToken;
  }
};

export default Mutation;
