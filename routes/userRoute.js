const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signUp", userController.rejectGet, authController.signUser);
router.post("/logIn", userController.rejectGet, authController.loginUser);

router.route("/").get(authController.protect, userController.getAllUsers);
// // .get(userController.getAllUsers)

// router.route("/:id").get(userController.getUser);

module.exports = router;
