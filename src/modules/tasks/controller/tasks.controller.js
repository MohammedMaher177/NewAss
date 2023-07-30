import asyncHandler from "express-async-handler";
import tasksModel from "../../../../DB/Models/tasks.model.js";




export const getAllTasks = asyncHandler(async (req, res) => {

    const {user} = req
    const tasks = await tasksModel.find()
    return res.json({message:"success", tasks})
})