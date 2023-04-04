const mongoose = require("mongoose");

const teachersSchema = mongoose.Schema({
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

module.exports = mongoose.model("teachers", teachersSchema);
