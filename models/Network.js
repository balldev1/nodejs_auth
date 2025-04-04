const mongoose = require("mongoose");

const networkSchema = new mongoose.Schema({
  header: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Network = mongoose.model("Network", networkSchema);

module.exports = Network;
