const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bookSchema = Schema(
  {
    author: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    pages: { type: Number, required: true },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false, timestamps: true }
);

const Book = model("books", bookSchema);

const bookAddSchema = Joi.object({
  author: Joi.string().required(),
  lang: Joi.string().required(),
  title: Joi.string().required(),
  link: Joi.string().required(),
  pages: Joi.number().required(),
});

const schemas = {
  bookAdd: bookAddSchema,
};

module.exports = {
  Book,
  schemas,
};
