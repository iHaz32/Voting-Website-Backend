const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("students", studentsSchema);
