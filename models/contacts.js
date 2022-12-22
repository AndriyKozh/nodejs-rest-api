const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const favoriteJoiSchem = Joi.object({
  favorite: Joi.bool(),
});
const Contact = model("contacts", contactSchema);
module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchem,
};
