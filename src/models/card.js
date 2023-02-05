const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
    emailId: {
      type: String,
      required: true,
    },
    vision: {
      type: String,
      required: true,
    },
    customerID: {
      type: String,
      ref: "customer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("card", cardSchema);
