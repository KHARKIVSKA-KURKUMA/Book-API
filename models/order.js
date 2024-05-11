const { Schema, model } = require("mongoose");
const Joi = require("joi");

const orderSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    book: {
      type: Object,
      ref: "books",
    },
  },
  { versionKey: false, timestamps: true }
);

const Order = model("orders", orderSchema);

const orderAddSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  bookId: Joi.string().required(),
});

const schemas = {
  orderAdd: orderAddSchema,
};

module.exports = {
  Order,
  schemas,
};
