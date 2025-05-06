const {
  insertVoterRepository,
  getAllVotersRepository,
  getVoterRepository,
  deleteVoterRepository
} = require("../repository/voters.repository");

const insertVoterService = async (voter) => {
  const newVoter = await insertVoterRepository(voter);
  return {
    message: "voter created successfully",
    voter: newVoter,
  };
};

const getAllVotersService = async () => {
  const voters = await getAllVotersRepository();
  return {
    message: "voters list",
    data: voters,
  };
};

const getVoterService = async (id) => {
  const voter = await getVoterRepository(id);
  return {
    message: "voter data",
    data: voter,
  };
};

const deleteVoterService = async (id) => {
    await deleteVoterRepository(id);
    return {
      message: "voter deleted",
    };
  };

module.exports = {
  insertVoterService,
  getAllVotersService,
  getVoterService,
  deleteVoterService
};
