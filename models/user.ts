import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  notes: String,
  date: Date,
  label: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  todos: [todoSchema],
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
