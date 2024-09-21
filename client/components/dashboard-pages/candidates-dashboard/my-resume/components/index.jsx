import React from 'react';
import Experiences from "./Experiences";

const Index = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Experience Section */}
        <div className="form-group col-lg-12 col-md-12">
          <Experiences />
        </div>

        {/* Save Button */}
        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
      {/* End .row */}
    </form>
  );
};

export default Index;