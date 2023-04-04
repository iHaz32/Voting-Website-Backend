const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  voteGossiper: {
    type: Boolean,
    required: true,
  },
  voteSleepyhead: {
    type: Boolean,
    required: true,
  },
  voteRadio: {
    type: Boolean,
    required: true,
  },
  voteLightningMcQueen: {
    type: Boolean,
    required: true,
  },
  voteEinstein: {
    type: Boolean,
    required: true,
  },
  voteLady: {
    type: Boolean,
    required: true,
  },
  voteAWOL: {
    type: Boolean,
    required: true,
  },
  voteTeachersPet: {
    type: Boolean,
    required: true,
  },
  voteAuthority: {
    type: Boolean,
    required: true,
  },
  voteComedian: {
    type: Boolean,
    required: true,
  },
  voteChimney: {
    type: Boolean,
    required: true,
  },
  voteSecondChance: {
    type: Boolean,
    required: true,
  },
  voteStoryTeller: {
    type: Boolean,
    required: true,
  },
  votePhilosopher: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("users", usersSchema);
