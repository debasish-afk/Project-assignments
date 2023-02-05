const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    name: String,
    seq: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("counter", counterSchema);
