const express = require("express");
const { signInUser, registerUser, changePassword } = require("./auth");
const { postJob, getJobById, getAllJobs, deleteJobs } = require("./postJob");
const { createProfile, getAllProfiles, getProfileByID } = require("./profile");
const { createResume } = require('./resume');
const router = express.Router();

//auth
router.post("/register", registerUser);
router.post("/signIn", signInUser);
router.post("/change-password", changePassword);

//jobs
router.post("/postJob", postJob);
router.get("/jobs/:id", getJobById);
router.get("/getAllJobs", getAllJobs);
router.delete('/jobs/:jobId', deleteJobs);

//profile-candidate
router.post("/createProfile", createProfile);
router.post("/createResume", createResume);
router.get('/profiles', getAllProfiles);
router.get('/profiles/:userID', getProfileByID);

module.exports = router;