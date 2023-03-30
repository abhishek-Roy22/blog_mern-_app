const express = require("express");

const { loginUser, signupUser } = require("../controllers/userControllers");

const router = express.Router();

// login Route
router.post("/login", loginUser);

// signup Route
router.post("/signup", signupUser);

module.exports = router;
