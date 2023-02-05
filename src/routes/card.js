const router = require("express").Router();
const CounterModel = require("../models/counter");
const CardModel = require("../models/card");

router.post("/create", async (req, res) => {
  try {
    const counter = await CounterModel.findOneAndUpdate(
      {},
      { $inc: { seq: 1 } }
    );
    const seq = counter.seq;
    const cardNumber = "C" + ("000" + seq).slice(-3);
    const card = new CardModel({
      cardNumber: cardNumber,
      cardType: req.body.cardType,
      customerName: req.body.customerName,
      emailId: req.body.emailId,
      vision: req.body.vision,
      customerID: req.body.customerID,
    });
    const createdCard = await card.save();
    return res.status(201).send({ status: true, data: createdCard });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const allCards = await CardModel.find();
    return res.status(200).send({ status: true, data: allCards });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
});

module.exports = router;
