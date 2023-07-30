import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import { hashPassword } from "../../../../util/util.js";
import { userModel } from "../../../../DB/Models/user.model.js";

// 1 - signUp;
export const signUp = asyncHandler(async (req, res) => {
  const { userName, email, password, age, gender, phone } = req.body;
  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return res.json({
      message: "error",
      param: "Email Already Exist",
    });
  } else {
    const hash = await hashPassword(password, 8);
    const user = new userModel({
      userName,
      email,
      password: hash,
      age,
      gender,
      phone,
    });
    await user.save();
    res.json({ message: "success", user });
  }
});

// 2-login-->with create token
export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("Email not Exist, please register as first");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect Password");
  }
  const token = jwt.sign(
    {
      id: user._id,
      name: user.userName,
      age: user.age,
      gender: user.gender,
      phone: user.phone,
    },
    "mohammed"
  );

  res.json({ message: "success", token });
});

//7-logout
export const logOut = asyncHandler(async (req, res) => {
  const {user} = req;
  const token = jwt.sign(
    {
      id: user._id
    },
    "mohammed",{
      expiresIn : "1s"
    }
  );
  res.json({ message: "success", token });
})
