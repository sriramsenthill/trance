import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useRouter } from 'next/router';


const PostBoxForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobDesc: '',
    keyRes: '',
    email: '',
    username: '',
    jobType: '',
    offeredSalary: '',
    careerLevel: '',
    experience: '',
    gender: '',
    industry: '',
    qualification: '',
    appDeadLine: '',
    country: '',
    city: '',
    completeAddress: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/postJob', formData);
      if (response.status === 201) {
        console.log('Job posted successfully:', response.data);
        // Redirect to home page
        router.push('/'); // Change this to your desired route
      }
    } catch (error) {
      console.error('Error posting job:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const jobTypeOptions = [
    { value: 'Full-Time', label: 'Full-Time' },
    { value: 'Part-Time', label: 'Part-Time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Remote', label: 'Remote' },
  ];

  const salaryOptions = [
    { value: '$1500', label: '$1500' },
    { value: '$2000', label: '$2000' },
    { value: '$2500', label: '$2500' },
    { value: '$3500', label: '$3500' },
    { value: '$4500', label: '$4500' },
    { value: '$5000', label: '$5000' },
  ];

  const careerLevelOptions = [
    { value: 'Entry Level', label: 'Entry Level' },
    { value: 'Junior Level', label: 'Junior Level' },
    { value: 'Mid-Level', label: 'Mid-Level' },
    { value: 'Senior Level', label: 'Senior Level' },
    { value: 'Lead Level', label: 'Lead Level' },
    { value: 'Executive Level', label: 'Executive Level' },
  ];

  const experienceOptions = [
    { value: '0-2 years', label: '0-2 years' },
    { value: '2-5 years', label: '2-5 years' },
    { value: '5-10 years', label: '5-10 years' },
    { value: '10+ years', label: '10+ years' },
    { value: '15+ years', label: '15+ years' },
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  const industryOptions = [
    { value: 'Banking', label: 'Banking' },
    { value: 'Digital & Creative', label: 'Digital & Creative' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Management', label: 'Management' },
  ];

  const qualificationOptions = [
    { value: '10th Grade', label: '10th Grade' },
    { value: '12th Grade', label: '12th Grade' },
    { value: 'Diploma', label: 'Diploma' },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: 'Bachelor of Engineering/Technology', label: 'Bachelor of Engineering/Technology' },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: 'Master of Business Administration', label: 'Master of Business Administration' },
  ];

  const countryOptions = [
    { value: 'Australia', label: 'Australia' },
    { value: 'Pakistan', label: 'Pakistan' },
    { value: 'China', label: 'China' },
    { value: 'Japan', label: 'Japan' },
    { value: 'India', label: 'India' },
  ];

  const cityOptions = [
    { value: 'Melbourne', label: 'Melbourne' },
    { value: 'Sydney', label: 'Sydney' },
    { value: 'Brisbane', label: 'Brisbane' },
    { value: 'Perth', label: 'Perth' },
    { value: 'Adelaide', label: 'Adelaide' },
  ];

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-12 col-md-12">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="Netflix"
            value={formData.companyName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Title"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea
            name="jobDesc"
            placeholder="Enter job description..."
            value={formData.jobDesc}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Key Responsibilities</label>
          <textarea
            name="keyRes"
            placeholder="Enter key responsibilities..."
            value={formData.keyRes}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          <Select
            options={jobTypeOptions}
            onChange={(selectedOption) => handleSelectChange('jobType', selectedOption)}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Offered Salary</label>
          <Select
            options={salaryOptions}
            onChange={(selectedOption) => handleSelectChange('offeredSalary', selectedOption)}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Career Level</label>
          <Select
            options={careerLevelOptions}
            onChange={(selectedOption) => handleSelectChange('careerLevel', selectedOption)}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <Select
            options={experienceOptions}
            onChange={(selectedOption) => handleSelectChange('experience', selectedOption)}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <Select
            options={genderOptions}
            onChange={(selectedOption) => handleSelectChange('gender', selectedOption)}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Industry</label>
          <Select
            options={industryOptions}
            onChange={(selectedOption) => handleSelectChange('industry', selectedOption)}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <Select
            options={qualificationOptions}
            onChange={(selectedOption) => handleSelectChange('qualification', selectedOption)}
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Application Deadline Date</label>
          <input
            type="text"
            name="appDeadLine"
            value={formData.appDeadLine}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <Select
            options={countryOptions}
            onChange={(selectedOption) => handleSelectChange('country', selectedOption)}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <Select
            options={cityOptions}
            onChange={(selectedOption) => handleSelectChange('city', selectedOption)}
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
            value={formData.completeAddress}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group col-lg-12 col-md-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;