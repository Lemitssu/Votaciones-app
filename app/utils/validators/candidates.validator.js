const Joi = require("joi");

const insertCandidateSchema = Joi.object({
  name: Joi.string().min(5).max(100).required(),
  party: Joi.string().min(5).max(100).required(),
  cc: Joi.string().min(5).max(7).required(),
});

module.exports = { insertCandidateSchema };