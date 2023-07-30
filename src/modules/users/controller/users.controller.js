import { userModel } from "../../../../DB/Models/user.model.js";
import asyncHandler from "express-async-handler";
import { hashPassword } from "../../../../util/util.js";

export const getAllUsers = async (req, res) => {
  const users = await userModel.find();
  res.json({ message: "hello", users });
};

// 3-change password (user must be logged in)
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { user } = req
  const { email, password, rePasswrd } = req.body
  if (password !== rePasswrd) {
    throw new Error("Password and rePassword is not matched");
  }
  const hash = await hashPassword(password, 8);
  const updatedUser = await userModel.findByIdAndUpdate(user._id, {
    password: hash
  }, { new: true })
  return res.json({ message: "success", updatedUser })
})

// 4-update user (age , firstName , lastName)(user must be logged in)
export const updateUserData = asyncHandler(async (req, res) => {
  const { user } = req
  const { email, userName, password, rePasswrd, age, gender, phone } = req.body

  if (password !== rePasswrd) {
    throw new Error("Password and rePassword is not matched");
  }
  const hash = await hashPassword(password, 8);

  const updatedUser = await userModel.findByIdAndUpdate(user._id, {
    password: hash,
    email, age, gender, phone, userName
  }, { new: true })
  return res.json({ message: "success", updatedUser })
})

// 5-delete user(user must be logged in)
export const deleteUser = asyncHandler(async (req, res) => {
  const { user } = req;
  const deletedUser = await userModel.findByIdAndDelete(user._id)
  return res.json({message:"success", param:"user is Deleted", deletedUser})
})

// 6-soft delete(user must be logged in)
export const softDeleteUser = asyncHandler(async (req, res) => {
  const { user } = req;
  user.deletedAt = new Date();
    await user.save();
    res.json({ message: 'Account has been deleted', user });
})