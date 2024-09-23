## Trance: Your AI-Powered Hiring Solution

Are you tired of the time-consuming and often frustrating process of recruiting top talent? **Trance** is here to revolutionize your hiring experience.

As a cutting-edge AI-powered recruiting platform, Trance is designed to streamline your hiring process and help you find the perfect candidates for your team. Our intuitive platform leverages advanced technology to automate tasks, enhance candidate engagement, and provide valuable insights.

### Key Features of Trance
- **Intelligent Candidate Matching**: Our AI algorithms analyze candidate profiles and job descriptions to identify the best matches based on skills, experience, and cultural fit.
- **Automated Applicant Tracking**: Streamline the application process with automated tracking and filtering, saving you time and effort.
- **Engaging Candidate Experience**: Provide a seamless and positive candidate experience with personalized communication and easy-to-use tools.
- **Data-Driven Insights**: Gain valuable insights into your hiring process with detailed analytics and reporting, helping you make informed decisions.
- **Integration with Existing Systems**: Easily integrate Trance with your HR systems and tools for a streamlined workflow.

Ready to experience the future of recruiting? Start your Trance journey today and discover how our AI-powered platform can transform your hiring process.

---

## Setting Up Your MERN Stack Project: Trance

### Prerequisites
Before we begin, ensure you have the following installed:
- **Node.js and npm**: Download and install the latest version from [nodejs.org](https://nodejs.org/en).
- **Git**: Download and install Git from [git-scm.com](https://git-scm.com/downloads).
- **A code editor**: We recommend Visual Studio Code, but you can use any editor of your choice.
- **A terminal or command prompt**: This is where you'll execute most of the commands.

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
1. Open the `Server` directory:
   ```bash
   cd trance-project/trance/server
   ```
3. Run this command to install dependencies:
   ```bash
   npm i --legacy-peer-deps
   ```
4. Once the installation is complete, go to the `client` directory:
   ```bash
   cd trance-project/trance/client
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

With these steps, you're set up to utilize Trance effectively in your development environment! Enjoy building your AI-powered hiring solution!
