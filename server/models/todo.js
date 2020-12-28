import mongoose from "mongoose";
const { Schema, model } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  enteredOn: {
    type: Date,
    required: true,
    default: Date.now
  },
  completed: {
    type: Boolean,
    required: true
  },
  completeBy: String,
  urgent: Boolean
});

const Todo = model("Todo", todoSchema);
export default Todo;
