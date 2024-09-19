const express = require("express");
const { signInUser } = require("./auth");
const { registerUser } = require("./auth");
const { postJob, getJobById, getAllJobs } = require("./postJob");
const { createProfile } = require("./profile");
const { createResume } = require("./resume");
const router = express.Router();

router.post("/register", registerUser);
router.post("/signIn", signInUser);

router.post("/postJob", postJob);
router.get("/jobs/:id", getJobById);
router.get("/getAllJobs", getAllJobs);

router.post("/createProfile", createProfile);
router.post("/createResume", createResume);

module.exports = router;