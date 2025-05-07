const candidate = require("../models/candidate");
const Vote = require("../models/vote");
const Voter = require("../models/voter");

const insertVoteRepository = async (data) => {
  const voteCreated = new Vote(data);
  return await voteCreated.save();
};

const getAllVotesRepository = async () => await Vote.find();

const vPerCandidateRepository = async () => {
  const votes = await Vote.aggregate([
    {
      $group: {
        _id: "$candidate_id",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "candidates",
        localField: "_id",
        foreignField: "_id",
        as: "candidateData",
      },
    },
    {
      $unwind: "$candidateData",
    },
    {
      $project: {
        _id: 1,
        count: 1,
        candidateName: "$candidateData.name",
      },
    },
  ]);
  return votes;
};

const percentagePerCandidateRepository = async () => {
  const votes = await Vote.aggregate([
    {
      $group: {
        _id: "$candidate_id",
        votes: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "candidates",
        localField: "_id",
        foreignField: "_id",
        as: "candidateData",
      },
    },
    {
      $unwind: "$candidateData",
    },
    {
      $group: {
        _id: null,
        candidates: {
          $push: {
            candidateId: "$_id",
            candidateName: "$candidateData.name",
            votes: "$votes",
          },
        },
        totalVotes: { $sum: "$votes" },
      },
    },
    {
      $project: {
        _id: 0,
        candidates: {
          $map: {
            input: "$candidates",
            as: "candidate",
            in: {
              candidateId: "$$candidate.candidateId",
              candidateName: "$$candidate.candidateName",
              votes: "$$candidate.votes",
              percentage: {
                $multiply: [
                  { $divide: ["$$candidate.votes", "$totalVotes"] },
                  100,
                ],
              },
            },
          },
        },
      },
    },
  ]);
  return votes[0]?.candidates || [];
};

const TtVotantesRepository = async () => {
  const votes = await Vote.countDocuments();
  return votes;
};

const findVoteRepository = async (id) => {
  const votes = await Voter.exists({
    $and: [{ _id: id }, { has_voted: true }],
  });
  return votes;
};

const VoterAsCandidateRepository = async (id) => {
  const match = await candidate.exists({ _id: id });
  return match;
};

module.exports = {
  insertVoteRepository,
  getAllVotesRepository,
  vPerCandidateRepository,
  percentagePerCandidateRepository,
  TtVotantesRepository,
  findVoteRepository,
  VoterAsCandidateRepository,
};
