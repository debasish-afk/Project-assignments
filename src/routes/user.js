const router = require("express").Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { verifyToken } = require("./auth");
const axios = require("axios");
const jwt =require("jsonwebtoken")
const {isValidEmail,isValidName,isValidPhoneNo}=require("./validation")

// SignUp
router.post("/signUp", async (req, res) => {
  try {
    if(!isValidName(req.body.userName)) return res.status(400).send({status:false, message:"Please provide a valid username!"})
    if(!isValidEmail(req.body.emailId)) return res.status(400).send({status:false, message:"Please provide a valid emailId!"})
    if(!isValidPhoneNo(req.body.PhoneNo)) return res.status(400).send({status:false, message:"Please provide a valid PhoneNo!"})

    let unique = await userModel.findOne({ $or: [{ emailId: req.body.emailId }, { PhoneNo: req.body.PhoneNo }] })
    if (unique) {
        if (unique.emailId == req.body.emailId)
            return res.status(400).send({ status: false, msg: "This Email is already Registered!" })
        if (unique.PhoneNo == req.body.PhoneNo)
            return res.status(400).send({ status: false, msg: "This Phone Number is already Registered!" })
    }
    const saltRound = 10;
    req.body.password = await bcrypt.hash(req.body.password, saltRound);
    const user = new userModel({
      userName: req.body.userName,
      emailId: req.body.emailId,
      PhoneNo: req.body.PhoneNo,
      password: req.body.password,
    });

    const createUser = await user.save();
    return res.status(201).send({ status: true, data: createUser });
  } catch (err) {
    return res.status(500).send({ status: false, Error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({
      userName: req.body.userName,
    });
    if (!user)
      return res
        .status(401)
        .send({ status: false, message: "Wrong credentials" });

    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordMatch)
      return res
        .status(400)
        .send({ status: false, message: "Wrong credentials!" });
    const generatedToken = jwt.sign(
      {
        id: user._id,
      },
      "secret",
      { expiresIn: "3d" }
    );
    return res.status(200).send({
      status: true,
      message: "User login successfull!",
      data: { userID: user._id, token: generatedToken },
    });
  } catch (err) {
    return res.status(500).send({ status: false, Error: err.message });
  }
});

// getUser
router.get("/me/:id", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .send({ status: false, message: "No such user exists" });
    return res.status(200).send({ status: true, message: "user", data: user });
  } catch (err) {
    return res.status(500).send({ status: false, Error: err.message });
  }
});

// random joke
router.get("/api/random-joke", async (req, res) => {
  try {
    let url="https://api.chucknorris.io/jokes/random"
    const result = await axios.get(url);
    const data = result.data.value;
    return res.status(200).send({ status: true, message: data });
  } catch (err) {
    return res.status(500).send({ status: false, Error: err.message });
  }
});

//   Logout
router.get("/logout", function (req, res) {
  res.clearCookie("jwt")
  res.status(200).json({ message: "User logged out successfully." });
});

module.exports = router;
