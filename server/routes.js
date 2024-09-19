const express = require("express");
const { signInUser } = require("./auth");
const { registerUser } = require("./auth");
const { postJob, getJobById } = require("./postJob");

const router = express.Router();

router.post("/register", registerUser);
router.post("/signIn", signInUser);

router.post("/postJob", postJob);
router.get('/jobs/:id', getJobById);

module.exports = router;