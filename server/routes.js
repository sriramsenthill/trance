const express = require("express");
const { signInUser } = require("./auth");
const { registerUser } = require("./auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/signIn", signInUser);


module.exports = router;