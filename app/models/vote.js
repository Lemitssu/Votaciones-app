const mongoose  = require('mongoose');
const { Schema } = mongoose;

const voteSchema = new Schema(
  {
    voter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voter",
      required: true,
    },
    candidate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Vote", voteSchema);
