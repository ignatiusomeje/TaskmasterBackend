import Joi from "joi";

const TaskValidation = async (req, res, next) => {
  try {
    const TaskSchema = Joi.object({
      title: Joi.string()
        .trim()
        .required("Task's title is Required")
        .min(6)
        .max(50),
      description: Joi.string()
        .trim()
        .required("Task's description is Required")
        .min(6),
      deadline: Joi.date().required("Deadline Date is required"),
      priority: Joi.string()
        .trim()
        .valid("low", "medium", "high")
        .required("Priority is Required"),
      status: Joi.string()
        .trim()
        .valid("todo", "doing", "done")
        .required("Status is Required")
    });

    await TaskSchema.validateAsync(req.body);

    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

export default TaskValidation;
