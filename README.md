# Trance - Smart Recruiting Platform

## Description
Trance is an innovative recruiting platform designed to streamline the hiring process using advanced AI algorithms. Our platform enhances the recruitment experience for both recruiters and candidates, ensuring efficient and effective hiring.

## Key Features

- **Intelligent Candidate Matching**: Our AI algorithms analyze candidate profiles and job descriptions to identify the best matches based on skills, experience, and cultural fit.
  
  ![Intelligent Candidate Matching](trance/images/1.png) <!-- Replace with actual path to image -->

- **Automated Applicant Tracking**: Streamline the application process with automated tracking and filtering, saving you time and effort.
  
  ![Automated Applicant Tracking](screenshots/automated_tracking.png) <!-- Replace with actual path to image -->

- **Engaging Candidate Experience**: Provide a seamless and positive candidate experience with personalized communication and easy-to-use tools.
  
  ![Engaging Candidate Experience](screenshots/candidate_experience.png) <!-- Replace with actual path to image -->

- **Data-Driven Insights**: Gain valuable insights into your hiring process with detailed analytics and reporting, helping you make informed decisions.
  
  ![Data-Driven Insights](screenshots/data_insights.png) <!-- Replace with actual path to image -->

- **Integration with Existing Systems**: Easily integrate Trance with your HR systems and tools for a streamlined workflow.
  
  ![Integration with Existing Systems](screenshots/integration_systems.png) <!-- Replace with actual path to image -->

- **AI-Assisted Form Filling**: Our intelligent AI assistant helps recruiters fill forms automatically with prompts based on different job roles, reducing manual data entry and ensuring accuracy.
  
  ![AI-Assisted Form Filling](screenshots/ai_form_filling.png) <!-- Replace with actual path to image -->

## Installation

To install the project, clone the repository:

```bash
git clone https://github.com/sriramsenthill/trance.git

## Setting Up Your MERN Stack Project: Trance

### Prerequisites
Before we begin, ensure you have the following installed:
- **Node.js and npm**: Download and install the latest version from [nodejs.org](https://nodejs.org/en).
- **Git**: Download and install Git from [git-scm.com](https://git-scm.com/downloads).
- **A code editor**: We recommend Visual Studio Code, but you can use any editor of your choice.
- **A terminal or command prompt**: This is where you'll execute most of the commands.
```

### 1. Create a New Project Directory
Open your terminal and navigate to the desired location for your project:
```bash
mkdir trance-project
cd trance-project
```

### 2. Clone the Project from GitHub
Clone the project repository using Git:
```bash
git clone https://github.com/sriramsenthill/trance.git
```

### 3. Install Dependencies
Install the necessary dependencies for your MERN stack project:
1. Open the `client` directory:
   ```bash
   cd trance-project/trance/client
   ```
3. Run this command to install dependencies:
   ```bash
   npm i --legacy-peer-deps
   ```
4. Once the installation is complete, go to the `server` directory:
   ```bash
   cd trance-project/trance/server
   ```
5. Run the command to install client dependencies:
   ```bash
   npm i
   ```
6. Install `bcryptjs` for password hashing:
   ```bash
   npm install bcryptjs
   ```

### 4. Start the Development Server
1. Go back to the `Server` directory and run:
   ```bash
   npm run dev
   ```
2. Open another terminal window, navigate to the `client` directory again, and run:
   ```bash
   npm run dev
   ```

This should start both the client and server on your local host at ports 3000 (server) and 3001 (client).

---

With these steps, you're set up to utilize Trance effectively in your development environment!

