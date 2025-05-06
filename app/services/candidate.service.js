const {
  insertCandidateRepository,
  getAllCandidatesRepository,
  getCandidateRepository,
  deleteCandidateRepository,
} = require("../repository/candidate.repository");

const insertCandidateService = async (candidate) => {
  const newCandidate = await insertCandidateRepository(candidate);
  return {
    message: "candidate created successfully",
    candidate: newCandidate,
  };
};

const getAllCandidatesService = async () => {
  const result = await getAllCandidatesRepository();
  return {
    message: "candidate list",
    candidates: result,
  };
};

const getCandidateService = async (id) => {
  const canditate = await getCandidateRepository(id);
  return {
    message: "candidate data",
    data: canditate,
  };
};

const deleteCandidateService = async (id) => {
  await deleteCandidateRepository(id);
  return {
    message: "candidate deleted",
  };
};

module.exports = {
  insertCandidateService,
  getAllCandidatesService,
  getCandidateService,
  deleteCandidateService,
};
