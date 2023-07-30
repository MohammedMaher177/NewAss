import { Router } from "express";
import { deleteUser, getAllUsers, softDeleteUser, updatePassword, updateUserData } from "./controller/users.controller.js";
import { logOut, signUp, signin } from "./controller/auth.controller.js";
import { auth } from "../../middleware/authentication.js";

const router = Router();
// 1)user

router.get("/", getAllUsers);

// 1 - signUp;
router.post("/signup", signUp);

// 2-login-->with create token
router.post("/signin", signin);


// 3-change password (user must be logged in)
router.patch("/updatepassword",auth, updatePassword);


//4-update user (age , firstName , lastName)(user must be logged in)
router.put("/updateuser", auth, updateUserData)

// 5-delete user(user must be logged in)
router.delete("/", auth, deleteUser)



//6-soft delete(user must be logged in)
router.delete("/softdelete", auth, softDeleteUser)

//7-logout
router.get("/logout", auth, logOut)
export default router;
