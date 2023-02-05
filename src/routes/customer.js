const router = require("express").Router();
const CustomerModel = require("../models/customer");
const { v4: uuidv4 } = require("uuid");

router.post("/create", async (req, res) => {
  if (!req.body.mobileNumber.length === 10)
    return res
      .status(400)
      .send({ status: false, message: "Mobile number should be of 10 digits" });
  const customer = new CustomerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    DOB: new Date(req.body.DOB),
    emailId: req.body.emailId,
    address: req.body.address,
    customerID: uuidv4(),
    status: req.body.status,
  });
  try {
    const savedCustomer = await customer.save();
    return res.status(201).send({ status: true, data: savedCustomer });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const customers = await CustomerModel.find({ status: "Active" });
    return res.status(200).send({ status: true, data: customers });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCustomer = await CustomerModel.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { new: true }
    );
    return res.status(200).send({ status: true, data: deletedCustomer });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
});

module.exports = router;
