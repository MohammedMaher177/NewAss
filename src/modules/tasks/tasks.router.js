import { Router } from "express";
import { auth } from "../../middleware/authentication.js";
import {
  addTask,
  deleteTask,
  getAllTasks,
  getTasksNotDone,
  getTasksOfOneUser,
  updateTask,
} from "./controller/tasks.controller.js";

const router = Router();

// 1-add task with status (toDo)(user must be logged in)
router.post("/", auth, addTask);

// 2-update task (title , description , status) (user must be logged in) (creator only can update task)
router.put("/:id", auth, updateTask)

// 3-delete task(user must be logged in) (creator only can delete task)
router.delete("/:id", auth, deleteTask);

// 4-get all tasks with user data
router.get("/", auth, getAllTasks);

// 5-get tasks of oneUser with user data (user must be logged in)
router.get("/getTasksOfOneUser", auth, getTasksOfOneUser);

// 6-get all tasks that not done after deadline
router.get("/getTasksNotDone", auth, getTasksNotDone);

export default router;
