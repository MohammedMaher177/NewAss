
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { userModel } from "../../DB/Models/user.model.js";






export const auth = asyncHandler(async (req, res, next) => {
    const { authorizathion } = req.headers;
    if (!authorizathion) {
        return next(new Error("authorizathion is required"))
    }
    const decoded = jwt.verify(authorizathion, "mohammed")

    if (!decoded?.id) {
        return next(new Error("Invalid Token payload"))
    }
    const user = await userModel.findById(decoded.id)
    if(!user){
        return next(new Error("Email not found"))
    }
    req.user = user
    return next()
})