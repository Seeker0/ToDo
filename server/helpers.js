import bcrypt from "bcrypt";
const saltRounds = 10;

const authorize = context => {
  const auth = context.req.get("authorization");
  if (!auth) throw new Error("Not authenticated");
  context.auth = auth;

  return context;
};

const getToken = async context => {
  authorize(context);
  const token = await context.models.Token.findById(context.auth);
  if (!token) {
    return {
      _id: null,
      user: null,
      message: "Please log in"
    };
  }

  return token;
};

const getUser = async context => {
  authorize(context);
  const { user } = await context.models.Token.getUser(context.auth);
  return user;
};

const getUserTodos = async context => {
  const user = await getUser(context);

  const { todos } = await context.models.User.getTodos(user._id);
  return todos;
};

const generate = async str => await bcrypt.hash(str, saltRounds);

const verify = async (password, hash) => await bcrypt.compare(password, hash);

export { getToken, getUser, getUserTodos, generate, verify };
