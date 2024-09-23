import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Config } from '../../../../../../config';
import { useSession } from "next-auth/react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormInfoBox = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    userID: '',
    profileLogo: '',
    fullName: '',
    jobTitle: '',
    phone: '',
    email: '',
    website: '',
    currentSalary: '',
    expectedSalary: '',
    experience: '',
    gender: '',
    age: '',
    educationLevels: '',
    languages: '',
    skills: '',
    description: '',
    linkedin: '',
    country: '',
    city: '',
    completeAddress: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);


    // Update formData when session is available
    useEffect(() => {
      if (status === "authenticated") {
        fetchUserProfile(session.user.userID);
        setFormData((prevData) => ({
          ...prevData,
          userID: session.user.userID, // Set userID once session is authenticated
        }));
      }
    }, [session, status]);

  const fetchUserProfile = async (userID) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/profiles/${userID}`);
      if (response.status === 200 && response.data) {
        setFormData(prevData => ({
          ...prevData,
          ...response.data,
          userID: userID
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setSnackbarMessage('Profile not found. Please fill in your details.');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Config.BACKEND_URL}/createProfile`, 
        formData
      );
      if (response.status === 201) {
        console.log('Profile posted successfully:', response.data);
        setSnackbarMessage("User Profile Created Successfully.");
        setSnackbarOpen(true);
        setTimeout(() => router.push('/'), 2000);
      }
    } catch (error) {
      console.error('Error posting profile:', error);
      setSnackbarMessage('Error posting profile. Please try again.');
      setSnackbarOpen(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="default-form">
      <div className="row">
        {/* Profile Logo */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Profile Logo</label>
          <input 
            type="text" 
            name="profileLogo" 
            placeholder="Logo URL" 
            required 
            onChange={handleChange}
            value={formData.profileLogo}
          />
        </div>

        {/* Full Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Name</label>
          <input 
            type="text" 
            name="fullName" 
            placeholder="Jerome" 
            required 
            onChange={handleChange}
            value={formData.fullName}
          />
        </div>

        {/* Job Title */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Title</label>
          <input type="text" name="jobTitle" placeholder="UI Designer" required onChange={handleChange} value={formData.jobTitle} />
        </div>

        {/* Phone */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input type="text" name="phone" placeholder="0 123 456 7890" required onChange={handleChange} value={formData.phone} />
        </div>

        {/* Email Address */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input type="email" name="email" placeholder="creativelayers@example.com" required onChange={handleChange} value={formData.email} />
        </div>

        {/* Website */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input type="text" name="website" placeholder="www.jerome.com" required onChange={handleChange} value={formData.website}/>
        </div>

        {/* Current Salary */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Current Salary($)</label>
          <select name="currentSalary" className="chosen-single form-select" required onChange={handleChange} value={formData.currentSalary}>
            <option value="">Select Salary</option>
            <option value="40-70 K">40-70 K</option>
            <option value="50-80 K">50-80 K</option>
            <option value="60-90 K">60-90 K</option>
            <option value="70-100 K">70-100 K</option>
            <option value="100-150 K">100-150 K</option>
          </select>
        </div>

        {/* Expected Salary */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Expected Salary($)</label>
          <select name="expectedSalary" className="chosen-single form-select" required onChange={handleChange} value={formData.expectedSalary}>
            <option value="">Select Salary</option>
            <option value="40-70 K">40-70 K</option>
            <option value="50-80 K">50-80 K</option>
            <option value="60-90 K">60-90 K</option>
            <option value="70-100 K">70-100 K</option>
            <option value="100-150 K">100-150 K</option>
            <option value="120-350 K">120-350 K</option>
          </select>
        </div>

        {/* Experience */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <input type="text" name="experience" placeholder="5-10 Years" required onChange={handleChange} value={formData.experience}/>
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <input type="text" name="gender" placeholder="M-F" required onChange={handleChange} value={formData.gender}/>
        </div>

        {/* Age */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Age</label>
          <input type="text" name="age" placeholder="your age" required onChange={handleChange} value={formData.age}/>

        </div>

        {/* Education Levels */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Education Levels</label>
          <input type="text" name="educationLevels" placeholder="Certificate" required onChange={handleChange} value={formData.educationLevels}/>
        </div>

        {/* Languages */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Languages</label>
          <input type="text" name="languages" placeholder="English, Turkish" required onChange={handleChange} value={formData.languages}/>
        </div>

        {/* Skills */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Skills</label>
          <input type="text" name="skills" placeholder="Application development, DevOps, etc." required onChange={handleChange} value={formData.skills}/>
        </div>

        {/* Description */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea name='description' placeholder='Job description...' required onChange={handleChange} value={formData.description}></textarea>
        </div>

        {/* LinkedIn */}
        <div className='form-group col-lg-6 col-md-12'>
          <label>LinkedIn Profile URL</label>
          <input
            type='text'
            name='linkedin'
            placeholder='https://linkedin.com/in/yourprofile'
            required
            onChange={handleChange}
            value={formData.linkedin}
          />
        </div>

        {/* Country */}
        <div className='form-group col-lg-6 col-md-12'>
          <label>Country</label>
          <input
            type='text'
            name='country'
            placeholder='Country'
            required
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        {/* City */}
        <div className='form-group col-lg-6 col-md-12'>
          <label>City</label>
          <input
            type='text'
            name='city'
            placeholder='City'
            required
            onChange={handleChange}
            value={formData.city}
          />
        </div>

        {/* Complete Address */}
        <div className='form-group col-lg-6 col-md-12'>
          <label>Complete Address</label>
          <input
            type='text'
            name='completeAddress'
            placeholder='123 Main St, Apt #4B'
            required
            onChange={handleChange}
            value={formData.completeAddress}
          />
        </div>

        {/* Submit Button */}
        <div className='form-group col-lg-6 col-md-12'>
          <button type='submit' className='theme-btn btn-style-one'>
            {formData.userID ? 'Update Profile' : 'Submit'}
          </button>
        </div>

        {/* Snackbar for notifications */}
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

export default FormInfoBox;
