import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }]
});

userSchema.statics.getTodos = async function(id) {
  const todos = await this.findById(id).populate("todos");
  return todos;
};

const User = model("User", userSchema);
export default User;
