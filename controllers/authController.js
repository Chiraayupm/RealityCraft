const { token } = require("morgan");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.signUser = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    Message: "User Created!",
  });
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return nres.json("Rechech data!");
  }

  const user = await User.findOne({ email }).select("+password");

  const correctPassword = await user.comparePassword(user.password, password);

  console.log(correctPassword);

  if (!user || !correctPassword) {
    return res.json("Rechech data!");
  }

  const token = jwt.sign({ id: user._id }, "secret-key", { expiresIn: "1d" });

  res.cookie("jwt", token, {
    expiresIn: "1d",
    secure: true,
    httpOnly: true,
  });

  res.status(201).json({
    status: "success",
    Message: "User Login Success!",
    token: token,
  });
};

exports.protect = async (req, res, next) => {
  // Check if there is header
  console.log("header");
  console.log(req.headers);

  var token = req.headers["cookie"].split("=")[1];

  if (!token) {
    return res.json("Rechech data!");
  }
  console.log(token);

  // Check if the token is verified
  console.log("Hello!");
  const decoded = await promisify(jwt.verify)(token, "secret-key");

  console.log(decoded.id);
  const userId = decoded.id;

  const checkUser = await User.findById({ _id: userId });
  // console.log(checkUser);
  if (!checkUser) {
    return res.json("Rechech data!");
  }

  next();
};
