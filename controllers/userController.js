const User = require("./../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("+password");
    console.log(users);
    res.status(200).json({
      Status: "Success",
      Length: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.json({
      Error: err,
    });
  }
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("+password");

  if (!user) {
    res.status(404).json({
      Status: "UnSuccessful",
      Message: "User Not Found!",
    });
  }

  res.status(200).json({
    Status: "Success",

    data: {
      user: user,
    },
  });
};

exports.rejectGet = async (req, res, next) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }
  next();
};
