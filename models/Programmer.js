const mongoose = require("mongoose");

const programmerSchema = new mongoose.Schema({
  header: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Programmer = mongoose.model("Programmer", programmerSchema);

module.exports = Programmer;
