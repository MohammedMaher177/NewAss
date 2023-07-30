import { Router } from "express"
import { auth } from "../../middleware/authentication.js"
import { getAllTasks } from "./controller/tasks.controller.js"


const router = Router()

router.get("/", auth, getAllTasks)

export default router