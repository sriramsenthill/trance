import React, { useState } from 'react';

const SkillsMultiple = () => {
  const [skills, setSkills] = useState(['']);

  const handleSkillsChange = (event) => {
    const inputSkills = event.target.value.split(',').map(skill => skill.trim());
    setSkills(inputSkills);
  };

  return (
    <div className="skills-input-container">
      <input
        type="text"
        value={skills.join(', ')}
        onChange={handleSkillsChange}
        placeholder="Enter skills separated by commas"
        className="skills-input"
        required
      />
      <div className="skills-list">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>
    </div>
  );
};

export default SkillsMultiple;
