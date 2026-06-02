import mongoose from "mongoose";
import { userInterface } from "../type/typeUser/typeUser.ts";

const schema = mongoose.Schema;

const userSchema = new schema<userInterface>(
  {
    fullname: { type: schema.Types.String, required: true },
    username: { type: schema.Types.String, required: true },
    age: { type: schema.Types.Number, required: true },
    email: { type: schema.Types.String, required: true },
    password: { type: schema.Types.String,required: true },
    role: { type: schema.Types.String,enum: ["admin", "user"], default: "user"},
    profilePicture: { type: schema.Types.String, default: "user.jpg" },
    isActive: { type: schema.Types.Boolean, default: false },
    activationCode: { type: schema.Types.String },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user",userSchema)

export default userModel;