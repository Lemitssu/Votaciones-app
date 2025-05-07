const Joi = require("joi");

const insertVotesSchema = Joi.object({
  voter_id: Joi.string().required(),
  candidate_id: Joi.string().required(),
});

module.exports = { insertVotesSchema };