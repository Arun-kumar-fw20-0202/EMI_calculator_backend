const express = require("express");
const { UserModel } = require("../Models/user.models");
const userRouter = express.Router();
userRouter.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const emailcheck = await UserModel.findOne({ email });
    if (emailcheck) {
      res.status(400).send({ msg: "email already used" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new UserModel({
          name,
          email,
          password: hash,
        });
        await user.save();
        res.status(200).send({ msg: "Registration successfull" });
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
//
// Login route

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "login successfull",
            token: jwt.sign({ userID: user._id }, process.env.secret_code),
          });
        } else {
          res.status(400).send({ msg: "wrong credential" });
        }
      });
    } else {
      res.status(400).send({ msg: "No user exist" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { userRouter };
