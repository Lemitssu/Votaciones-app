const Candidate = require("../models/candidate");

const insertCandidateRepository = async (data) => {
  const candidate = new Candidate(data);
  return await candidate.save();
};

const getAllCandidatesRepository = async () => await Candidate.find();

const getCandidateRepository = async (id) => {
  return await Candidate.findById(id);
};

const deleteCandidateRepository = async (id) => {
  return await Candidate.findByIdAndDelete(id);
};

module.exports = {
  insertCandidateRepository,
  getAllCandidatesRepository,
  getCandidateRepository,
  deleteCandidateRepository,
};
