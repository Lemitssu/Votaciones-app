const {
  insertVoteRepository,
  getAllVotesRepository,
  vPerCandidateRepository,
  percentagePerCandidateRepository,
  TtVotantesRepository,
  findVoteRepository,
  VoterAsCandidateRepository,
} = require("../repository/vote.repository");

const {
  updateVoteStatusRepository,
} = require("../repository/voters.repository");

const {
  updateCandidateVotesRepository,
} = require("../repository/candidate.repository");

const insertVoteService = async (vote) => {
  try {
    const iscandidate = await VoterAsCandidateRepository(vote.voter_id);
    if (iscandidate) {
      throw new Error("Candidate cannot vote");
    }

    const alreadyVoted = await findVoteRepository(vote.voter_id);
    if (alreadyVoted) {
      throw new Error("Voter already voted");
    }

    const newVote = await insertVoteRepository(vote);
    if (!newVote) {
      throw new Error("Failed to register the vote");
    }

    const updateVoter = await updateVoteStatusRepository(vote.voter_id);

    const updateCandidateVote = await updateCandidateVotesRepository(
      vote.candidate_id
    );
    return {
      message: "Vote registered successfully",
      voter: { updateVoter, updateCandidateVote },
    };
  } catch (error) {
    console.error(error);
    throw new Error("there was an error registering the vote");
  }
};

const getAllVotesService = async () => {
  try {
    const votes = await getAllVotesRepository();
    return {
      message: "votes list",
      data: votes,
    };
  } catch (error) {
    throw new Error("there was an error getting the votes");
  }
};

const getVoteSatatisticsService = async () => {
  try {
    const totalVotesCandidates = await vPerCandidateRepository();
    const percentagePerCandidate = await percentagePerCandidateRepository();
    const totalVoters = await TtVotantesRepository();
    return {
    message: "votes statistics",
    data: {
      totalVotesCandidates,
        percentagePerCandidate,
        totalVoters,
      },
    };
  } catch (error) {
    throw new Error("there was an error getting the votes statistics");
  }
};

module.exports = {
  insertVoteService,
  getAllVotesService,
  getVoteSatatisticsService,
};
