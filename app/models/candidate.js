const mongoose  = require('mongoose');
const { Schema } = mongoose;

const candidateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cc: {
      type: String,
      required: true,
      unique:true
    },
    party: {
      type: String,
      default: null,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Candidate", candidateSchema);
