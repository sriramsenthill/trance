import React from 'react';
import ResumeForm from "./ResumeForm";

const Index = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
      <div className="row">
        {/* Experience Section */}
        <div className="form-group col-lg-12 col-md-12">
          <ResumeForm />
        </div>

   
      </div>
  

  );
};

export default Index;