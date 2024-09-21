const express = require("express");
const { signInUser, registerUser, changePassword } = require("./auth");
const { postJob, getJobById, getAllJobs, deleteJobs } = require("./postJob");
const { createProfile } = require("./profile");
const { createResume } = require("./resume");
const router = express.Router();

router.post("/register", registerUser);
router.post("/signIn", signInUser);
router.post("/change-password", changePassword);

router.post("/postJob", postJob);
router.get("/jobs/:id", getJobById);
router.get("/getAllJobs", getAllJobs);
router.delete('/jobs/:jobId', deleteJobs);


router.post("/createProfile", createProfile);
router.post("/createResume", createResume);



module.exports = router;