import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is a required field`,
    "string.empty": `"name" cannot be an empty field`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `"email" is a required field`,
    "string.empty": `"email" cannot be an empty field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is a required field`,
    "string.empty": `"phone" cannot be an empty field`,
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": `"name" cannot be an empty field`,
  }),
  email: Joi.string().email().messages({
    "string.empty": `"email" cannot be an empty field`,
  }),
  phone: Joi.string().messages({
    "string.empty": `"phone" cannot be an empty field`,
  }),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });
