import mongoose, { ObjectId } from "mongoose";

export interface IUser {
  name: string,
  email: string,
  password: string,
  createdAt: Date,
  _id: ObjectId
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model("User", userSchema);
