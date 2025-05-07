const Joi = require("joi");

const insertVoterSchema = Joi.object({
  name: Joi.string().min(5).max(100).required(),
  cc: Joi.string().min(5).max(7).required(),
  email: Joi.string()
    .max(100)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
});

module.exports = { insertVoterSchema };
