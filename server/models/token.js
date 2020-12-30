import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tokenSchema = new Schema({
  _id: {
    type: String,
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

tokenSchema.statics.getUser = async function(id) {
  const token = await this.findOne({ _id: id }).populate("user");
  console.log(token);
  return token;
};

const Token = model("Token", tokenSchema);
export default Token;
