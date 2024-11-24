import { Tasks } from "../Models/TaskModel.js";
import { isValidObjectId } from "mongoose";

export async function createTask(req, res) {
  try {
    const task = new Tasks({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      priority: req.body.priority,
      status: req.body.status,
      creator: req.user,
    });

    const newTask = await task.save();

    res.status(200).json({
      status: 200,
      message: newTask,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error creating Task",
    });
  }
}

export async function getAllTasks(req, res) {
  try {
    const title = req.query.title;
    const priority = req.query.priority;

    const tasks = await Tasks.find({
      $or: [{ title }, { priority }],
    }).sort({ createdAt: -1 });

    if (!tasks) {
      return res.status(404).json({
        status: 404,
        message: `No Task found`,
      });
    }

    return res.status(200).json({
      status: 200,
      message: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error fetching tasks",
    });
  }
}

export async function updateATaskById(req, res) {
  try {
    if (!isValidObjectId(req.params.id)){
      return res.status(400).json({
        status: 400,
        message: `Invalid Task ID`,
      })
    }

    const taskToUpdate = await Tasks.findById(req.params.id);

    if (!taskToUpdate) {
      return res.status(404).json({
        status: 404,
        message: `Task Not Found`,
      });
    }

    await Tasks.findOneAndUpdate({_id: req.params.id},{...req.body},{new: true})

    return res.status(200).json({
      status: 200,
      message: drug,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error updating task",
    });
  }
}

export async function deleteATaskById(req, res) {
  try {
    if (!isValidObjectId(req.params.id)){
      return res.status(400).json({
        status: 400,
        message: `Invalid Task ID`,
      })
    }

    const taskToDelete = await Tasks.findById(req.params.id);

    if (!taskToDelete) {
      return res.status(404).json({
        status: 404,
        message: `Drug not found`,
      });
    }
    await Tasks.findByIdAndDelete(req.params.id)

    return res.status(204).json({
      status: 204,
      message: `Task deleted Successfully`,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error deleting task",
    });
  }
}
