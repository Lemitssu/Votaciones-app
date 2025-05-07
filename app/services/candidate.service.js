const {
  insertCandidateRepository,
  getAllCandidatesRepository,
  getCandidateRepository,
  deleteCandidateRepository,
  CandidateExistsRepository,
  CandidateIsVoterRepository
} = require("../repository/candidate.repository");

const insertCandidateService = async (candidate) => {
  try {
    const isVoter = await CandidateIsVoterRepository(candidate);
    if (isVoter){
      throw new Error("Voter cannot be a candidate");
  }
  const candidateExists = await CandidateExistsRepository(candidate);
  if (candidateExists){
    throw new Error("Candidate already exists");
  }
  const newCandidate = await insertCandidateRepository(candidate);
  return {
      message: "candidate created successfully",
      candidate: newCandidate,
    };
  } catch (error) {
    throw new Error("there was an error registering the candidate");
  }
};

const getAllCandidatesService = async () => {
  try {
    const result = await getAllCandidatesRepository();
    return {
      message: "candidate list",
      candidates: result,
    };
  } catch (error) {
    throw new Error("there was an error getting the candidates");
  }
};

const getCandidateService = async (id) => {
  try {
    const canditate = await getCandidateRepository(id);
    return {
      message: "candidate data",
      data: canditate,
    };
  } catch (error) {
    throw new Error("there was an error getting the candidate");
  }
};

const deleteCandidateService = async (id) => {
  try {
    await deleteCandidateRepository(id);
    return {
      message: "candidate deleted",
    };
  } catch (error) {
    throw new Error("there was an error deleting the candidate");
  }
};

module.exports = {
  insertCandidateService,
  getAllCandidatesService,
  getCandidateService,
  deleteCandidateService,
};
