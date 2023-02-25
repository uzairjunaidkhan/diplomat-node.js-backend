const mongoose = require("mongoose");

const Member = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const MemberModel = mongoose.model("members", Member);  

module.exports = MemberModel;