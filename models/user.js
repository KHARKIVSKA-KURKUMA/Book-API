const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    email: {
      type: String,
      match: emailRegExp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    name: {
      type: String,
      minlength: 3,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
});

const schemas = {
  register: registerSchema,
  login: loginSchema,
  email: emailSchema,
};

const User = model("users", userSchema);

module.exports = {
  User,
  schemas,
};
