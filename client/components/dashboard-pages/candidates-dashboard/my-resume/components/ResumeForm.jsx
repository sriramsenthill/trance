import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';
import { Config } from '../../../../../config';
import { useSession } from "next-auth/react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ResumeForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formData, setFormData] = useState({
    userID: '',
    selectcv: '',
    desc: '',
    workExperience: [{ companyName: '', jobRole: '', experiencedesc: '', workStart: '', workEnd: '', YOE: '' }],
    education: [{ courseName: '', instituteName: '', educationDesc: '', instituteStart: '', instituteEnd: '' }],
    portfoliolink: '',
    skills: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (status === "authenticated") {
      setFormData((prevData) => ({
        ...prevData,
        userID: session.user.userID,
      }));
      fetchResumeData(session.user.userID);
    }
  }, [session, status]);

  const fetchResumeData = async (userID) => {
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/resumes/${userID}`);
      if (response.status === 201 && response.data) {
        setFormData(response.data);
      }
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching resume data:', error);
      setSnackbarMessage("Failed to fetch resume data. Using empty form.");
      setSnackbarOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWorkChange = (index, e) => {
    const { name, value } = e.target;
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index][name] = value;
    setFormData({ ...formData, workExperience: newWorkExperience });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index][name] = value;
    setFormData({ ...formData, education: newEducation });
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [...formData.workExperience, { companyName: '', jobRole: '', experiencedesc: '', workStart: '', workEnd: '', YOE: '' }]
    });
  };

  const removeWorkExperience = (index) => {
    const newWorkExperience = formData.workExperience.filter((_, i) => i !== index);
    setFormData({ ...formData, workExperience: newWorkExperience });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { courseName: '', instituteName: '', educationDesc: '', instituteStart: '', instituteEnd: '' }]
    });
  };

  const removeEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Config.BACKEND_URL}/createResume`, formData);
      if (response.status === 201) {
        console.log('Resume created successfully:', response.data);
        setSnackbarMessage("Resume created successfully.");
        setSnackbarOpen(true);
        setTimeout(() => router.push('/'), 2000);
      }
    } catch (error) {
      console.error('Error creating resume:', error);
      setSnackbarMessage("Failed to create resume. Please try again.");
      setSnackbarOpen(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="default-form">
      <div className="row">
        {/* Select Your CV */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Select Your CV</label>
          <select name="selectcv" className="chosen-single form-select" value={formData.selectcv} onChange={handleChange}>
            <option value="">Select CV</option>
            <option value="cv1">CV 1</option>
            <option value="cv2">CV 2</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea name="desc" placeholder="Enter your description here..." value={formData.desc} onChange={handleChange}></textarea>
        </div>

        {/* Work Experience Section */}
        <div className="form-group col-lg-12 col-md-12">
          <h4 style={{ fontSize: "15px", lineHeight: "20px", color: "#202124", fontWeight: "500", marginBottom: "10px" }}>Work Experience</h4>
          {formData.workExperience.map((experience, index) => (
            <div key={index} className="work-experience-item">
              <input
                style={{ marginBottom: "10px" }}
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={experience.companyName}
                onChange={(e) => handleWorkChange(index, e)}
                required
              />
              <input
                style={{ marginBottom: "10px" }}
                type="text"
                name="jobRole"
                placeholder="Job Role"
                value={experience.jobRole}
                onChange={(e) => handleWorkChange(index, e)}
                required
              />
              <input
                style={{ marginBottom: "10px" }}
                type="text"
                name="experiencedesc"
                placeholder="Description"
                value={experience.experiencedesc}
                onChange={(e) => handleWorkChange(index, e)}
                required
              />
              <input
                style={{ marginBottom: "10px" }}
                type="text"
                name="workStart"
                placeholder="Start Date (YYYY-MM-DD)"
                value={experience.workStart}
                onChange={(e) => handleWorkChange(index, e)}
                required
              />
              <input
                style={{ marginBottom: "10px" }}
                type="text"
                name="workEnd"
                placeholder="End Date (YYYY-MM-DD)"
                value={experience.workEnd}
                onChange={(e) => handleWorkChange(index, e)}
                required
              />
              <input
                style={{ marginBottom: "10px" }}
                type="number"
                name="YOE"
                placeholder="Years of Experience"
                value={experience.YOE}
                onChange={(e) => handleWorkChange(index, e)}
                required
              />
              {formData.workExperience.length > 1 && (
                <button style={{ marginBottom: "10px", float: 'right', cursor: 'pointer' }} type="button" onClick={() => removeWorkExperience(index)} className="remove-btn">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button style={{ float: 'right', paddingRight: "10px", cursor: 'pointer' }} type="button" onClick={addWorkExperience} className="add-btn">
            Add Work Experience
          </button>
        </div>

        {/* Education Section */}
        <div className="form-group col-lg-12 col-md-12">
          <h4 style={{ fontSize: "15px", lineHeight: "20px", color: "#202124", fontWeight: "500", marginBottom: "10px" }}>Education</h4>
          {formData.education.map((education, index) => (
            <div key={index} className="education-item">
              <input
                style={{ marginBottom: "10px" }}
                type="text"
                name="courseName"
                placeholder="Course Name"
                value={education.courseName}
                onChange={(e) => handleEducationChange(index, e)}
                required
              />
              <input
                style={{ marginBottom: "10px" }}
                type="text"
                name="instituteName"
                placeholder="Institution Name"
                value={education.instituteName}
                onChange={(e) => handleEducationChange(index, e)}
                required
              />
              <input
                style={{ marginBottom: "10px" }}
                type="text"
                name="educationDesc"
                placeholder="Description"
                value={education.educationDesc}
                onChange={(e) => handleEducationChange(index, e)}
                required
              />
              <input
                style={{ marginBottom: "10px" }}
                type="text"
                name="instituteStart"
                placeholder="Start Date (YYYY-MM-DD)"
                value={education.instituteStart}
                onChange={(e) => handleEducationChange(index, e)}
                required
              />
              <input
                style={{ marginBottom: "10px" }}
                type="text"
                name="instituteEnd"
                placeholder="End Date (YYYY-MM-DD)"
                value={education.instituteEnd}
                onChange={(e) => handleEducationChange(index, e)}
                required
              />
              {formData.education.length > 1 && (
                <button style={{ marginBottom: "10px", float: 'right', cursor: 'pointer' }} type="button" onClick={() => removeEducation(index)} className="remove-btn">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button style={{ marginBottom: "10px", float: 'right', cursor: 'pointer' }} type="button" onClick={addEducation} className="add-btn">
            Add Education
          </button>
        </div>

        {/* Portfolio Section */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Portfolio</label>
          <input
            type="text"
            name="portfoliolink"
            placeholder="Add Portfolio Link"
            value={formData.portfoliolink}
            onChange={handleChange}
          />
        </div>

        {/* Skills Section */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            placeholder="Enter skills separated by commas"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">Submit Resume</button>
        </div>

        {/* Success Message */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </div>
    </form>
  );
};

export default ResumeForm;