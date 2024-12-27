import mongoose from "mongoose";

export interface interUser {
  email: string;
  password: string;
  _id?: string;
  refreshToken?: string[];
}

const userSchema = new mongoose.Schema<interUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: [String],
    default: [],
  }
});

const userModel = mongoose.model<interUser>("Users", userSchema);

export default userModel;