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
    keyRes: "Key Responsibility",
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
    appDeadLine: "Application Deadline",
    country: "Country",
    city: "City",
    completeAddress: "Complete Address",
  };

  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleAIGenerate = async () => {
    const userPrompt = prompt(
      "Please provide the job requirements, basic details, and salary info."
    );

    if (userPrompt) {
      setIsGenerating(true);
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `Generate job details in JSON format with the following fields: 
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
                  "completeAddress": "",
         
                }
                Based on: ${userPrompt}`,
            },
          ],
          model: "mixtral-8x7b-32768",
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/postJob",
        formData
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
    <form className="default-form" onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={handleAIGenerate}
        className="theme-btn btn-style-one"
      >
        {isGenerating ? "Generating..." : "AI Auto-Generate"}
      </button>

      <div className="row">
        {Object.keys(formData).map((field) => (
          <div key={field} className="form-group col-lg-6 col-md-12">
            <label>{fieldDisplayNames[field]}</label>
            {field === "jobDesc" || field === "keyRes" || field === "skills" ? (
              <textarea
                name={field}
                placeholder={`Enter ${fieldDisplayNames[field]}...`}
                value={formData[field]}
                onChange={handleInputChange}
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
          <button type="submit" className="theme-btn btn-style-one">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;