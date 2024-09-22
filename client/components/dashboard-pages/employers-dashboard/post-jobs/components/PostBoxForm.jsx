import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const PostBoxForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobDesc: "",
    keyRes: "",
    skills: "",
    email: "",
    username: "",
    jobType: "",
    offeredSalary: "",
    careerLevel: "",
    experience: "",
    gender: "",
    industry: "",
    qualification: "",
    appDeadLine: "",
    country: "",
    city: "",
    completeAddress: "",
  });

  const fieldDisplayNames = {
    companyName: "Company Name",
    jobTitle: "Job Title",
    jobDesc: "Job Description",
    keyRes: "Key Responsibilities",
    skills: "Skills",
    email: "Email",
    username: "Username",
    jobType: "Job Type",
    offeredSalary: "Offered Salary",
    careerLevel: "Career Level",
    experience: "Experience",
    gender: "Gender",
    industry: "Industry",
    qualification: "Qualification",
    appDeadLine: "Application Deadline: ",
    country: "Country",
    city: "City",
    completeAddress: "Complete Address",
  };

  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userPromptData, setUserPromptData] = useState("");

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const extractJSONFromText = (text) => {
    const jsonRegex = /{[\s\S]*}/;
    const match = text.match(jsonRegex);
    return match ? match[0] : null;
  };

  const handleAIGenerate = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleModalSubmit = async () => {
    if (userPromptData) {
      setIsGenerating(true);
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `Generate job details in JSON format with the following fields,elaborate keyres,jobdesc,skills in bullet points with line break ('\n'):
                {
                  "companyName": "",
                  "jobTitle": "",
                  "jobDesc": "",
                  "keyRes": "",
                  "skills": "", 
                  "email": "",
                  "username": "",
                  "jobType": "",
                  "offeredSalary": "",
                  "careerLevel": "",
                  "experience": "",
                  "gender": "",
                  "industry": "",
                  "qualification": "",
                  "appDeadLine": "",
                  "country": "",
                  "city": "",
                  "completeAddress": ""
                }
                Based on: ${userPromptData}`,
            },
          ],
          model: "llama3-groq-70b-8192-tool-use-preview",
        });
  
        const generatedContent = completion.choices[0]?.message?.content || "";
        console.log("Generated Content:", generatedContent);
  
        const jsonContent = extractJSONFromText(generatedContent);
        console.log("Extracted JSON:", jsonContent);
  
        if (jsonContent) {
          try {
            const parsedData = JSON.parse(jsonContent);
            console.log("Parsed Data:", parsedData);
  
            // Update form data with generated content
            setFormData((prevData) => {
              const updatedData = { ...prevData };
  
              // Check if keyRes is an array or a string
              if (parsedData.keyRes) {
                if (Array.isArray(parsedData.keyRes)) {
                  updatedData.keyRes = parsedData.keyRes.join('\n');
                } else if (typeof parsedData.keyRes === 'string') {
                  updatedData.keyRes = parsedData.keyRes.split(',').join('\n');
                }
              }
  
              // Check if jobDesc is an array or a string
              if (parsedData.jobDesc) {
                if (Array.isArray(parsedData.jobDesc)) {
                  updatedData.jobDesc = parsedData.jobDesc.join('\n');
                } else if (typeof parsedData.jobDesc === 'string') {
                  updatedData.jobDesc = parsedData.jobDesc.split(',').join('\n');
                }
              }
  
              // Check if skills is an array or a string
              if (parsedData.skills) {
                if (Array.isArray(parsedData.skills)) {
                  updatedData.skills = parsedData.skills.join('\n');
                } else if (typeof parsedData.skills === 'string') {
                  updatedData.skills = parsedData.skills.split(',').join('\n');
                }
              }
  
              for (const [key, value] of Object.entries(parsedData)) {
                if (value !== "") {
                  updatedData[key] = value;
                }
              }
              return updatedData;
            });
          } catch (parseError) {
            console.error("Error parsing generated content:", parseError);
          }
        } else {
          console.error("No valid JSON found in the generated content");
        }
  
        setIsGenerating(false);
      } catch (error) {
        console.error("Error generating job details:", error);
        setIsGenerating(false);
      }
      setIsModalOpen(false); // Close the modal after processing
      setUserPromptData(""); // Reset input data
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Config.BACKEND_URL}/postJob`,
        formData,
      );
      if (response.status === 201) {
        console.log("Job posted successfully:", response.data);
        router.push("/"); // Change this to your desired route
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <>
      <form className="default-form" onSubmit={handleSubmit}>
        <button
          style={{ marginBottom: "20px" }}
          type="button"
          onClick={handleAIGenerate}
          className="theme-btn btn-style-one"
        >
          {isGenerating ? "Generating..." : "AI Auto-Generate"}
        </button>

        <div className="row">
          {Object.keys(formData).map((field) => (
            <div key={field} className="form-group col-lg-12 col-md-12">
              <label>{fieldDisplayNames[field]}</label>
              {field === "jobDesc" ||
                field === "keyRes" ||
                field === "skills" ? (
                <textarea
                  name={field}
                  placeholder={`Enter ${fieldDisplayNames[field]}...`}
                  value={formData[field]}
                  onChange={handleInputChange}
                  rows={5} // Adjust the rows attribute for better readability
                ></textarea>
              ) : (
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "appDeadLine"
                      ? "date"
                      : "text"
                  }
                  name={field}
                  style={{ width: "100%" }}
                  placeholder={`Enter ${fieldDisplayNames[field]}...`}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
              )}
              {errors[field] && (
                <p className="error-message" style={{ color: "red" }}>
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

<div className="form-group col-lg-12 col-md-12 text-right">
            <button onClick={handleModalSubmit} className="theme-btn btn-style-one">
              Submit
            </button>
        </div>
        </div>
      </form>

      {/* Modal for user input */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
              Enter Job Details
            </h2>{" "}
            {/* Smaller font size for title */}
            <textarea
              className="input-box"
              placeholder="Please provide the job requirements, basic details, constants and salary info."
              value={userPromptData}
              onChange={(e) => setUserPromptData(e.target.value)}
            />
            <div className="form-group col-lg-12 col-md-12 text-right">
            <button onClick={handleModalSubmit} className="theme-btn btn-style-one">
              Submit
            </button>
        </div>
          </div>
        </div>
      )}
      
      {/* Styles for modal */}
      <style jsx>{`
        .modal {
          display: flex;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.4);
        }

        .modal-content {
          background-color: #fefefe;
          margin: auto;
          padding: 20px;
          border-radius: 8px; /* Rounded corners for modal */
          width: 80%;
          max-width: 600px;
        }

        .close {
          color: #aaa;
          float: left;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }

        .input-box {
          width: 100%;
          height: 150px;
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 8px;
          font-size: 14px;
          border: 1px solid #ccc;
        }

        .bordered-btn {
          padding: 10px 20px;
          font-size: 16px;
          border: 1px solid #000;
          border-radius: 4px;
          background-color: transparent;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default PostBoxForm;
