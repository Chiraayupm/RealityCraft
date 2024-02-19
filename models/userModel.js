const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email Cannot Be Empty"],
    unique: true,
  },
  password: {
    type: String,
    select: false,
    // required: [true]
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async (correctPassword, userPassword) => {
  return await bcrypt.compare(userPassword, correctPassword);
};

const Users = mongoose.model("users", UserSchema);

module.exports = Users;
