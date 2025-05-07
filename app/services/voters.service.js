const {
  insertVoterRepository,
  getAllVotersRepository,
  getVoterRepository,
  deleteVoterRepository
} = require("../repository/voters.repository");

const insertVoterService = async (voter) => {
  try {
    const newVoter = await insertVoterRepository(voter);
    return {
      message: "voter created successfully",
      voter: newVoter,
    };
  } catch (error) {
    throw new Error("there was an error registering the voter");
  }
};

const getAllVotersService = async () => {
  try {
    const voters = await getAllVotersRepository();
    return {
      message: "voters list",
      data: voters,
    };
  } catch (error) {
    throw new Error("there was an error getting the voters");
  }
};

const getVoterService = async (id) => {
  try {
    const voter = await getVoterRepository(id);
    return {
      message: "voter data",
      data: voter,
    };
  } catch (error) {
    throw new Error("there was an error getting the voter");
  }
};

const deleteVoterService = async (id) => {
  try {
    await deleteVoterRepository(id);
    return {
      message: "voter deleted",
    };
  } catch (error) {
    throw new Error("there was an error deleting the voter");
  }
};

module.exports = {
  insertVoterService,
  getAllVotersService,
  getVoterService,
  deleteVoterService
};
