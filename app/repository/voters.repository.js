const Voter = require("../models/voter");

const insertVoterRepository = async (data) => {
  const voter = new Voter(data);
  return await voter.save();
};

const getAllVotersRepository = async () => await Voter.find();

const getVoterRepository = async (id) => {
  return await Voter.findById(id);
};

const deleteVoterRepository = async (id) => {
    return await Voter.findByIdAndDelete(id);
  };

module.exports = {
  insertVoterRepository,
  getAllVotersRepository,
  getVoterRepository,
  deleteVoterRepository
};
