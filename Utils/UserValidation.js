import Joi from "joi";

export const CreateUserValidation = async (req, res, next) => {
  console.log(req.body);
  try {
    const userSchema = Joi.object({
      email: Joi.string().trim().email().required("Email field is required"),
      firstName: Joi.string()
        .trim()
        .required("First name field is Required")
        .min(3)
        .max(50),
      lastName: Joi.string()
        .trim()
        .required("Last name field is Required")
        .min(3)
        .max(50),
      password: Joi.string().required("Password field is required").min(6),
      confirmPassword: Joi.string()
        .required("Confirm Password field is required")
        .min(6),
    });

    await userSchema.validateAsync(req.body);

    next();
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

export const LoginValidation = async (req, res, next) => {
  try {
    const LoginSchema = Joi.object({
      email: Joi.string().trim().email().required("email field is required"),
      password: Joi.string().required("Password field is required").min(6),
    });

    await LoginSchema.validateAsync(req.body);

    next();
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
