import { Router } from "express";
import { getAllUsers } from "./controller/users.controller.js";
import { signUp, signin } from "./controller/auth.controller.js";

const router = Router();
// 1)user

router.get("/", getAllUsers);

// 1 - signUp;
router.post("/signup", signUp);

// 2-login-->with create token
router.post("/signin", signin);

export default router;
