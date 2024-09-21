import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa'; // Using react-icons for icons

const Experience = () => {
  // State for Select Your CV
  const [selectedCV, setSelectedCV] = useState('');

  // State for Description
  const [description, setDescription] = useState('');

  // State for Work Experience
  const [workExperiences, setWorkExperiences] = useState([
    { companyName: '', jobRole: '', description: '', startDate: '', endDate: '', YOE: '' }
  ]);

  // State for Education
  const [educations, setEducations] = useState([
    { course: '', institution: '', description: '', startDate: '', endDate: '' }
  ]);

  // State for Portfolio Link
  const [portfolioLink, setPortfolioLink] = useState('');

  // State for Skills (single string)
  const [skills, setSkills] = useState('');

  // Handle changes in Select Your CV
  const handleCVChange = (event) => {
    setSelectedCV(event.target.value);
  };

  // Handle changes in Description
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Handle changes in work experience fields
  const handleWorkChange = (index, event) => {
    const { name, value } = event.target;
    const newWorkExperiences = [...workExperiences];
    newWorkExperiences[index][name] = value;
    setWorkExperiences(newWorkExperiences);
  };

  // Add new work experience field
  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      { companyName: '', jobRole: '', description: '', startDate: '', endDate: '', YOE: '' }
    ]);
  };

  // Remove work experience field
  const removeWorkExperience = (index) => {
    const newWorkExperiences = workExperiences.filter((_, i) => i !== index);
    setWorkExperiences(newWorkExperiences);
  };

  // Handle changes in education fields
  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const newEducations = [...educations];
    newEducations[index][name] = value;
    setEducations(newEducations);
  };

  // Add new education field
  const addEducation = () => {
    setEducations([
      ...educations,
      { course: '', institution: '', description: '', startDate: '', endDate: '' }
    ]);
  };

  // Remove education field
  const removeEducation = (index) => {
    const newEducations = educations.filter((_, i) => i !== index);
    setEducations(newEducations);
  };

  // Handle changes in portfolio link
  const handlePortfolioChange = (event) => {
    setPortfolioLink(event.target.value);
  };

  // Handle changes in skills input (single string)
  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  return (
    <div>
      {/* Select Your CV */}
      <div className="form-group col-lg-6 col-md-12">
        <label>Select Your CV</label>
        <select className="chosen-single form-select" value={selectedCV} onChange={handleCVChange}>
          <option value="">Select CV</option>
          <option value="cv1">CV 1</option>
          <option value="cv2">CV 2</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Description */}
      <div className="form-group col-lg-12 col-md-12">
        <label>Description</label>
        <textarea
          placeholder="Enter your description here..."
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>

      {/* Work Experience Section */}
      <h4>Work Experience</h4>
      {workExperiences.map((experience, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <input
            style={{ marginBottom: '20px' }}
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={experience.companyName}
            onChange={(e) => handleWorkChange(index, e)}
            required
          />
          <input
            style={{ marginBottom: '20px' }}
            type="text"
            name="jobRole"
            placeholder="Job Role"
            value={experience.jobRole}
            onChange={(e) => handleWorkChange(index, e)}
            required
          />
          <input
            style={{ marginBottom: '20px' }}
            type="text"
            name="description"
            placeholder="Description"
            value={experience.description}
            onChange={(e) => handleWorkChange(index, e)}
            required
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              name="startDate"
              placeholder="Start Date (YYYY-MM-DD)"
              value={experience.startDate}
              onChange={(e) => handleWorkChange(index, e)}
              required
            />
            <input
              type="text"
              name="endDate"
              placeholder="End Date (YYYY-MM-DD)"
              value={experience.endDate}
              onChange={(e) => handleWorkChange(index, e)}
              required
            />
            <input
              type="text"
              name="YOE"
              placeholder="Years of Experience"
              value={experience.YOE}
              onChange={(e) => handleWorkChange(index, e)}
              required
            />
          </div>
          {workExperiences.length > 1 && (
            <button type="button" onClick={() => removeWorkExperience(index)}>
              <FaTrash /> Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addWorkExperience}
        style={{ float: 'right', marginBottom: '20px' }}
      >
        <FaPlus /> Add Work Experience
      </button>

      {/* Education Section */}
      <h4>Education</h4>
      {educations.map((education, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <input
            style={{ marginBottom: '20px' }}
            type="text"
            name="course"
            placeholder="Course Name"
            value={education.course}
            onChange={(e) => handleEducationChange(index, e)}
            required
          />
          <input
            style={{ marginBottom: '20px' }}
            type="text"
            name="institution"
            placeholder="Institution Name"
            value={education.institution}
            onChange={(e) => handleEducationChange(index, e)}
            required
          />
          <input
            style={{ marginBottom: '20px' }}
            type="text"
            name="description"
            placeholder="Description"
            value={education.description}
            onChange={(e) => handleEducationChange(index, e)}
            required
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              name="startDate"
              placeholder="Start Date (YYYY-MM-DD)"
              value={education.startDate}
              onChange={(e) => handleEducationChange(index, e)}
              required
            />
            <input
              type="text"
              name="endDate"
              placeholder="End Date (YYYY-MM-DD)"
              value={education.endDate}
              onChange={(e) => handleEducationChange(index, e)}
              required
            />
          </div>
          {educations.length > 1 && (
            <button type="button" onClick={() => removeEducation(index)}>
              <FaTrash /> Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addEducation}
        style={{ float: 'right', marginBottom: '20px' }}
      >
        <FaPlus /> Add Education
      </button>

      {/* Portfolio Section */}
      <div className="form-group col-lg-6 col-md-12">
        <label>Portfolio</label>
        <input
          type="text"
          name="portfolioLink"
          placeholder="Add Portfolio Link"
          value={portfolioLink}
          onChange={handlePortfolioChange}
          required
        />
      </div>

      {/* Skills Section */}
      <h4>Skills</h4>
      <input
        type="text"
        value={skills}
        onChange={handleSkillsChange}
        placeholder="Enter skills separated by commas"
        className="skills-input"
        required
      />

      {/* Displaying Skills */}
      {skills && (
        <div className="skills-list">
          {skills.split(',').map((skill, index) => (
            skill.trim() && <span key={index} className="skill-tag">{skill.trim()}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;