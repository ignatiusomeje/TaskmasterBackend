import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
    },
    priority: {
      type: String,
      trim: true,
      enum: ["low", "medium", "high"],
      required: [true, "Priority is required"],
    },
    status: {
      type: String,
      trim: true,
      required: [true, "Status is required"],
      enum: ["todo", "doing", "done"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Creator is required"],
    },
  },
  { usetimestamp: true }
);

export const Tasks = mongoose.model("Tasks", TaskSchema);
