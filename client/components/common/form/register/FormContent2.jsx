import { useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useRouter } from 'next/router'; // Import useRouter from next/router
import { Config } from "../../../../config";

const FormContent2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate"); // Default role
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/register`, {
        email,
        password,
        role,
      });

      console.log("Response:", response.data);

      // Check if registration was successful
      if (response.status === 201) { // Adjust based on your backend response structure
        // Redirect to the login page after successful registration
        router.push('/login'); // Use router.push to navigate to the login page
      } else {
        console.error("Registration failed:", response.data.message);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group register-dual">
        <Tabs>
          <TabList className="btn-box row">
            <Tab className="col-lg-6 col-md-12" onClick={() => setRole("candidate")}>
              <button type="button" className="theme-btn btn-style-four">
                <i className="la la-user"></i> Candidate
              </button>
            </Tab>

            <Tab className="col-lg-6 col-md-12" onClick={() => setRole("employer")}>
              <button type="button" className="theme-btn btn-style-four">
                <i className="la la-briefcase"></i> Employer
              </button>
            </Tab>
          </TabList>
        </Tabs>
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="username"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password Field */}
      <div className="form-group">
        <label>Password</label>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default FormContent2;