const express = require("express");
const { signInUser, registerUser, changePassword } = require("./auth");
const { postJob, getJobById, getAllJobs, deleteJobs } = require("./postJob");
const { createProfile, getAllProfiles, getProfileByID } = require("./profile");
const { createResume, getResumeDetails } = require('./resume');
const { applyJob, checkApplied, appliedJobs, getAppliedJobs } = require('./applyjob');
const { getUserProfilesByJobId } = require('./allApplicants');

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
router.post("/applyjob", applyJob);
router.post("/checkApplied", checkApplied);
router.get("/applied-jobs", appliedJobs);
router.get("/getAppliedJobs", getAppliedJobs);

//profile-candidate
router.post("/createProfile", createProfile);
router.post("/createResume", createResume);
router.get('/profiles', getAllProfiles);
router.get('/profiles/:userID', getProfileByID);
router.get('/resumes/:userID', getResumeDetails);

router.get("/allApplicants", getUserProfilesByJobId);


module.exports = router;