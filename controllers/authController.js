const { token } = require("morgan");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.signUser = async (req, res) => {
  try {
    const userAlreadyExists = await User.findOne({ email: req.body.email });
    if (userAlreadyExists) {
      return res.json({
        status: "Error",
        Message: "This EMail ID already exists!",
      });
    }
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      Message: "User Created!",
      User: newUser,
    });
  } catch (err) {
    res.json({
      status: "Error",
      Message: err,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json("Email or password not entered!");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.json("This User Does not Exist, Recheck Email!");
    }

    const correctPassword = await user.comparePassword(user.password, password);

    console.log(correctPassword);

    if (!correctPassword) {
      return res.json("Wrong Password Entered Please Check again!");
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
  } catch (err) {
    res.json({
      Status: "Error",
      Message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // Check if there is header
    console.log("header");
    console.log(req.headers);

    var token = req.headers["cookie"].split("=")[1];
    // var token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2I4MjA0YjRkZWFhYzJiMzU2ZTczYSIsImlhdCI6MTcwNzgzNjc1NCwiZXhwIjoxNzA3OTIzMTU0fQ.7fo4GmdtpATe9pR1PV-01LDCIQK6jL5zljlItijRYCM";

    if (!token) {
      return res.json("Token Expired or Token Does not exist!");
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
      return res.json("Token Expired Login Again!");
    }

    next();
  } catch (err) {
    console.log(err);
    return res.json({
      Status: "Error",
      Message: err,
    });
  }
};
