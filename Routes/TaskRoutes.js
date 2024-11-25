import express from "express";
import TaskValidation from "./../Utils/TaskValidation.js";
import {
  createTask,
  deleteATaskById,
  getAllTasks,
  updateATaskById,
} from "../Controllers/TaskController.js";
import { authenticate } from "../Utils/Authenticate.js";

const taskRouter = express.Router();

taskRouter.post("/", TaskValidation, authenticate, createTask);
taskRouter.get("/", authenticate, getAllTasks);
taskRouter.put("/:id",authenticate, updateATaskById);
taskRouter.delete("/:id",authenticate, deleteATaskById);

export default taskRouter;
