import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email"],
  },
  image: {
    type: String,
    default: "",
  }
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
