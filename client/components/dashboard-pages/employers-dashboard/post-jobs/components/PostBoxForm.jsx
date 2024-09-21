import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Config } from '../../../../../config';

const PostBoxForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobDesc: '',
    keyRes: '',
    skills: '',
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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption ? selectedOption.value : '' });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const response = await axios.post(`${Config.BACKEND_URL}/postJob`, formData);
        if (response.status === 201) {
          console.log('Job posted successfully:', response.data);
          router.push('/');
        }
      } catch (error) {
        console.error('Error posting job:', error);
      }
    } else {
      console.log('Form validation failed');
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
    { value: '4LPA', label: '4LPA' },
    { value: '6LPA', label: '6LPA' },
    { value: '8LPA', label: '8LPA' },
    { value: '10LPA', label: '10LPA' },
    { value: '15LPA', label: '15LPA' },
    { value: '20LPA', label: '20LPA' },
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
            placeholder="Enter company name..."
            value={formData.companyName}
            onChange={handleInputChange}
          />
          {errors.companyName && <p className="error-message" style={{ color: 'red' }}>{errors.companyName}</p>}
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Enter title..."
            value={formData.jobTitle}
            onChange={handleInputChange}
          />
          {errors.jobTitle && <p className="error-message" style={{ color: 'red' }}>{errors.jobTitle}</p>}
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea
            name="jobDesc"
            placeholder="Enter job description..."
            value={formData.jobDesc}
            onChange={handleInputChange}
          ></textarea>
          {errors.jobDesc && <p className="error-message" style={{ color: 'red' }}>{errors.jobDesc}</p>}
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Key Responsibilities</label>
          <textarea
            name="keyRes"
            placeholder="Enter key responsibilities..."
            value={formData.keyRes}
            onChange={handleInputChange}
          ></textarea>
          {errors.keyRes && <p className="error-message" style={{ color: 'red' }}>{errors.keyRes}</p>}
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Skills & Experience</label>
          <textarea
            name="skills"
            placeholder="Enter Skills & Experience..."
            value={formData.skills}
            onChange={handleInputChange}
          ></textarea>
          {errors.skills && <p className="error-message" style={{ color: 'red' }}>{errors.skills}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error-message" style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <p className="error-message" style={{ color: 'red' }}>{errors.username}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          <Select
            options={jobTypeOptions}
            onChange={(selectedOption) => handleSelectChange('jobType', selectedOption)}
            value={formData.jobType ? { value: formData.jobType, label: formData.jobType } : null}
          />
          {errors.jobType && <p className="error-message" style={{ color: 'red' }}>{errors.jobType}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Offered Salary</label>
          <Select
            options={salaryOptions}
            onChange={(selectedOption) => handleSelectChange('offeredSalary', selectedOption)}
            value={formData.offeredSalary ? { value: formData.offeredSalary, label: formData.offeredSalary } : null}
          />
          {errors.offeredSalary && <p className="error-message" style={{ color: 'red' }}>{errors.offeredSalary}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Career Level</label>
          <Select
            options={careerLevelOptions}
            onChange={(selectedOption) => handleSelectChange('careerLevel', selectedOption)}
            value={formData.careerLevel ? { value: formData.careerLevel, label: formData.careerLevel } : null}
          />
          {errors.careerLevel && <p className="error-message" style={{ color: 'red' }}>{errors.careerLevel}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <Select
            options={experienceOptions}
            onChange={(selectedOption) => handleSelectChange('experience', selectedOption)}
            value={formData.experience ? { value: formData.experience, label: formData.experience } : null}
          />
          {errors.experience && <p className="error-message" style={{ color: 'red' }}>{errors.experience}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <Select
            options={genderOptions}
            onChange={(selectedOption) => handleSelectChange('gender', selectedOption)}
            value={formData.gender ? { value: formData.gender, label: formData.gender } : null}
          />
          {errors.gender && <p className="error-message" style={{ color: 'red' }}>{errors.gender}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Industry</label>
          <Select
            options={industryOptions}
            onChange={(selectedOption) => handleSelectChange('industry', selectedOption)}
            value={formData.industry ? { value: formData.industry, label: formData.industry } : null}
          />
          {errors.industry && <p className="error-message" style={{ color: 'red' }}>{errors.industry}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <Select
            options={qualificationOptions}
            onChange={(selectedOption) => handleSelectChange('qualification', selectedOption)}
            value={formData.qualification ? { value: formData.qualification, label: formData.qualification } : null}
          />
          {errors.qualification && <p className="error-message" style={{ color: 'red' }}>{errors.qualification}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Application Deadline Date</label>
          <input
            type="text"
            name="appDeadLine"
            placeholder='DD/MM/YYYY'
            value={formData.appDeadLine}
            onChange={handleInputChange}
          />
          {errors.appDeadLine && <p className="error-message" style={{ color: 'red' }}>{errors.appDeadLine}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <Select
            options={countryOptions}
            onChange={(selectedOption) => handleSelectChange('country', selectedOption)}
            value={formData.country ? { value: formData.country, label: formData.country } : null}
          />
          {errors.country && <p className="error-message" style={{ color: 'red' }}>{errors.country}</p>}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
         <input
            type="text"
            name="city"
            placeholder='Chennai'
            value={formData.city}
            onChange={handleInputChange}
          />
          {errors.city && <p className="error-message" style={{ color: 'red' }}>{errors.city}</p>}
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            placeholder="Enter your address here..."
            value={formData.completeAddress}
            onChange={handleInputChange}
          />
          {errors.completeAddress && <p className="error-message" style={{ color: 'red' }}>{errors.completeAddress}</p>}
        </div>

        <div className="form-group col-lg-12 col-md-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;