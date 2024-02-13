const mongoose = require("mongoose");
const app = require("./index");
const express = require("express");
const userRoute = require("./routes/userRoute");
// const bmRecordRoute = require("./routes/bmRecordsRoute");
// const signupRoute = require("./routes/signupRoute");
// const loginRoute = require("./routes/loginRoute");
// const homeRoute = require("./routes/homeRoutes");
// const log4js = require("log4js");
// const authController = require("./controllers/authController");

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://chiraayu:Chiraayu2001@bmtest.kq9a0wr.mongodb.net/realitycraft"
  )
  .then(() => {
    console.log("Connection Successful!");
  });

// const port = process.env.PORT || 3000;

const port = 3000;

const server = app.listen(port, () => {
  console.log("Running");
});

app.use("/api/v1/user", userRoute);

// app.use("/bmForm", bmFormRoute);
// app.use("/bmRecords", bmRecordRoute);
// app.use("/signup", signupRoute);
// app.use("/login", loginRoute);
// app.use("/logout", authController.logout);
// app.use("/", homeRoute);

//The 404 Route

// app.get("/Error404", (req, res) => {
//   res.render("Error404");
// });

// app.get("/Error503", (req, res) => {
//   res.render("Error503");
// });

app.get("*", (req, res) => {
  res.json({
    Path: "Path Does Not exist",
  });
});
