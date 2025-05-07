const Candidate = require("../models/candidate");
const Voter = require("../models/voter");

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

const CandidateExistsRepository = async (data) => {
  const match = await Candidate.exists({ name: data.name, party: data.party });
  return match;
};

const CandidateIsVoterRepository = async (data) => {
  const match = await Voter.exists({ name: data.name, cc: data.cc });
  return match;
};

const updateCandidateVotesRepository = async (id) => {
  return await Candidate.findByIdAndUpdate(id, {$inc: {votes: 1}},{new: true});
};

module.exports = {
  insertCandidateRepository,
  getAllCandidatesRepository,
  getCandidateRepository,
  deleteCandidateRepository,
  CandidateExistsRepository,
  CandidateIsVoterRepository,
  updateCandidateVotesRepository
};
