const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    address: {
      type: String
    },
    customerID: {
      type: String
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerSchema);
