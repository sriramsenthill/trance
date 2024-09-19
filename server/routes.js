const express = require("express");
const { signInUser } = require("./auth");
const { registerUser } = require("./auth");
const { postJob, getJobById } = require("./postJob");
const {createProfile} = require("./profile");
const {createResume} = require("./resume");
const router = express.Router();

router.post("/register", registerUser);
router.post("/signIn", signInUser);

router.post("/postJob", postJob);

module.exports = router;