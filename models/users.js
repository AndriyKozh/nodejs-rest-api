const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);
const registerJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(6).required(),
  password: Joi.string().required(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().min(6).required(),
  password: Joi.string().required(),
});

const Users = model("users", userSchema);

module.exports = {
  Users,
  registerJoiSchema,
  loginJoiSchema,
};
