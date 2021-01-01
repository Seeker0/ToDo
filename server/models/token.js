import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcrypt";
const saltRounds = 10;

const tokenSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

tokenSchema.statics.getUser = async function(id) {
  const token = await this.findById(id).populate("user");
  return token;
};

tokenSchema.statics.findOrCreate = async function(id, email) {
  const token = await this.findOne({ user: id });

  if (!token) {
    const hash = await bcrypt.hash(email, saltRounds);
    const newToken = this.create({
      _id: hash,
      user: id
    });
    return newToken;
  }
  return token;
};
const Token = model("Token", tokenSchema);
export default Token;
