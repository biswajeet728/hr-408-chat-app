import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // default: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
