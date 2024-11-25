import express from "express";
import {
  CreateUserValidation,
  LoginValidation,
} from "./../Utils/UserValidation.js";
import { createUser, loginUser } from "../Controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/create", CreateUserValidation, createUser);
userRouter.post("/login", LoginValidation, loginUser);
// userRouter.put("/:id", updateADrug);
// userRouter.delete("/:id", deleteADrug);

export default userRouter;
