const express = require("express");
const { signInUser, registerUser, changePassword } = require("./auth");
const { postJob, getJobById, getAllJobs, deleteJobs, fetchJobStatistics } = require("./postJob");
const { createProfile, getAllProfiles, getProfileByID } = require("./profile");
const { createResume, getResumeDetails } = require('./resume');
const { applyJob, checkApplied, appliedJobs, getAppliedJobs, postJobScore, fetchJobApplicationStatistics } = require('./applyjob');
const { getUserProfilesByJobId, getShortlistedUserProfilesByJobId, getAllUserProfiles } = require('./allApplicants');
const { postShortlisted, getTotalShortlistedApplicants, getJobsForUser } = require('./shortlisted');
const { postRejected, fetchTotalRejectedJobs } = require('./rejected');

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
router.post("/postJobScore", postJobScore);
router.post("/postShortlisted", postShortlisted);
router.post("/postRejected", postRejected);
router.get("/shortlistedProfile", getShortlistedUserProfilesByJobId);
router.get("/getJobsForUser", getJobsForUser);
router.get("/getTotalShortlistedApplicants", getTotalShortlistedApplicants);
router.get("/fetchTotalRejectedJobs", fetchTotalRejectedJobs);
router.get("/fetchJobStatistics", fetchJobStatistics);
router.get("/fetchJobApplicationStatistics", fetchJobApplicationStatistics);

//profile-candidate
router.post("/createProfile", createProfile);
router.post("/createResume", createResume);
router.get('/profiles', getAllProfiles);
router.get('/profiles/:userID', getProfileByID);
router.get('/resumes/:userID', getResumeDetails);
router.get("/allApplicants", getUserProfilesByJobId);
router.get("/getAllUserProfiles", getAllUserProfiles);


module.exports = router;