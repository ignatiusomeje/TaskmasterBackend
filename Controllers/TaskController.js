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
    let tasks;
    if (title) {
      tasks = await Tasks.find({
        title: new RegExp(title, "i"),
        creator: req.user,
      }).sort({ createdAt: -1 });
    } else if (priority) {
      tasks = await Tasks.find({
        priority: new RegExp(priority, "i"),
        creator: req.user,
      }).sort({ createdAt: -1 });
    } else {
      tasks = await Tasks.find({
        creator: req.user,
      }).sort({ createdAt: -1 });
    }

    if (tasks.length === 0) {
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
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        status: 400,
        message: `Invalid Task ID`,
      });
    }

    const taskToUpdate = await Tasks.findOne({
      _id: req.params.id,
      creator: req.user,
    });

    if (!taskToUpdate) {
      return res.status(404).json({
        status: 404,
        message: `Task Not Found`,
      });
    }

    await Tasks.findOneAndUpdate(
      { _id: req.params.id, creator: req.user },
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: `Tasks updated Successfully`,
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
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        status: 400,
        message: `Invalid Task ID`,
      });
    }

    const taskToDelete = await Tasks.findOne({
      _id: req.params.id,
      creator: req.user,
    });

    if (!taskToDelete) {
      return res.status(404).json({
        status: 404,
        message: `Drug not found`,
      });
    }
    await Tasks.findByIdAndDelete(req.params.id);

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
