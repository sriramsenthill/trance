import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Config } from '../../../../../../config';

const FormInfoBox = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3000/createProfile", formData);
        if (response.status === 201) {
          console.log('Profile posted successfully:', response.data);
          setSuccessMessage('Profile posted successfully!');
          // Redirect to home page after a short delay
          setTimeout(() => router.push('/'), 2000);
        }
      } catch (error) {
        console.error('Error posting profile:', error);
        setSuccessMessage('Error posting profile. Please try again.');
      }
    }
 


  return (
    <form onSubmit={handleSubmit} className="default-form">
      <div className="row">
        {/* Profile Logo */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Profile Logo</label>
          <input type="text" name="profileLogo" placeholder="Logo URL" required onChange={handleChange} />
        </div>

        {/* Full Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Name</label>
          <input type="text" name="fullName" placeholder="Jerome" required onChange={handleChange} />
        </div>

        {/* Job Title */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Title</label>
          <input type="text" name="jobTitle" placeholder="UI Designer" required onChange={handleChange} />
        </div>

        {/* Phone */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input type="text" name="phone" placeholder="0 123 456 7890" required onChange={handleChange} />
        </div>

        {/* Email Address */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input type="email" name="email" placeholder="creativelayers@example.com" required onChange={handleChange} />
        </div>

        {/* Website */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input type="text" name="website" placeholder="www.jerome.com" required onChange={handleChange} />
        </div>

        {/* Current Salary */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Current Salary($)</label>
          <select name="currentSalary" className="chosen-single form-select" required onChange={handleChange}>
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
          <select name="expectedSalary" className="chosen-single form-select" required onChange={handleChange}>
            <option value="">Select Salary</option>
            <option value="120-350 K">120-350 K</option>
            <option value="40-70 K">40-70 K</option>
            <option value="50-80 K">50-80 K</option>
            <option value="60-90 K">60-90 K</option>
            <option value="70-100 K">70-100 K</option>
            <option value="100-150 K">100-150 K</option>
          </select>
        </div>

        {/* Experience */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <input type="text" name="experience" placeholder="5-10 Years" required onChange={handleChange} />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <input type="text" name="gender" placeholder="M-F" required onChange={handleChange} />
        </div>

        {/* Age */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Age</label>
          <input type="text" name="age" placeholder="your age" required onChange={handleChange} />

        </div>

        {/* Education Levels */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Education Levels</label>
          <input type="text" name="educationLevels" placeholder="Certificate" required onChange={handleChange} />
        </div>

        {/* Languages */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Languages</label>
          <input type="text" name="languages" placeholder="English, Turkish" required onChange={handleChange} />
        </div>

        {/* Skills */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Skills</label>
          <input type="text" name="skills" placeholder="Application development, DevOps, etc." required onChange={handleChange} />
        </div>

        {/* Description */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea name='description' placeholder='Job description...' required onChange={handleChange}></textarea>
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
              	/>
              	</div>

         {/* Submit Button */}
          	<div className='form-group col-lg-6 col-md-12'>
              	<button type='submit' className='theme-btn btn-style-one'>Submit</button>
            </div> 
       </div> 
     </form> 
   ); 
  };

export default FormInfoBox;