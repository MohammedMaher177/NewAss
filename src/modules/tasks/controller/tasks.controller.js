import asyncHandler from "express-async-handler";
import tasksModel from "../../../../DB/Models/tasks.model.js";
import { userModel } from "../../../../DB/Models/user.model.js";

// 1-add task with status (toDo)(user must be logged in)
export const addTask = asyncHandler(async (req, res) => {
  const { title, description, assignTo, deadline } = req.body;
  const userId = req.user._id;
  const user = await userModel.findById(assignTo);
  if (!user) {
    throw new Error(
      "Email you try to assign not found, please choose another email"
    );
  }
  const task = new tasksModel({
    title,
    description,
    assignTo,
    deadline,
    userId,
  });
  await task.save();
  return res.json({ message: "success", task });
});

// 2-update task (title , description , status) (user must be logged in) (creator only can update task)
export const updateTask = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { title, description, assignTo, deadline } = req.body;
  const checkTask = await tasksModel.findById(id);
  if (checkTask.userId !== _id) {
    throw new Error("Not Allowed");
  }
  const task = await tasksModel.findByIdAndUpdate(
    _id,
    {
      title,
      description,
      assignTo,
      deadline,
    },
    { new: true }
  );
  return res.json({ message: "success", task });
});

// 3-delete task(user must be logged in) (creator only can delete task)
export const deleteTask = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const task = await tasksModel.findById(id);
  if (task.userId !== userId) {
    throw new Error("Not Allowed");
  }
  await tasksModel.findByIdAndDelete(id);
  return res.json({ message: "success", param: "Task Delete successfully" });
});

// 4-get all tasks with user data
export const getAllTasks = asyncHandler(async (req, res) => {
  const { user } = req;
  const tasks = await tasksModel.find({userId : user._id}).populate([
    {
      path: "userId",
      select: "userName email",
    },
    {
      path: "assignTo",
      select: "userName email",
    },
  ]);
  return res.json({ message: "success", tasks });
});

// 5-get tasks of oneUser with user data (user must be logged in)
export const getTasksOfOneUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const tasks = await tasksModel.find({ userId: _id }).populate([
    {
      path: "assignTo",
      select: "userName email",
    },
  ]);
  return res.json({ message: "success", tasks });
});

// 6-get all tasks that not done after deadline
export const getTasksNotDone = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const date = Date.now();
  const tasks = await tasksModel.find({
    status: "toDo" || "doing",
    deadline: { $lt: date },
    userId: _id,
  });
  // .populate([
  //   {
  //     path: "assignTo",
  //     select: "userName email",
  //   },
  // ]);
  return res.json({ message: "success", tasks });
});
