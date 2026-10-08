import express from "express";
import { loginUser, registerUser, AdminLogin } from "../controllers/userController.js";


const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/admin", AdminLogin)


export default userRouter
