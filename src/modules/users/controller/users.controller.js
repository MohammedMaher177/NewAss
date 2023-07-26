import { userModel } from "../../../../DB/Models/user.model.js";

export const getAllUsers = async (req, res) => {
  const users = await userModel.find();
  res.json({ message: "hello", users });
};
