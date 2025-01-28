import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import axios from "axios"; // Axios for API calls

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Options for charts
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: "Job and Applicant Data",
    },
  },
};

const ProfileChart = () => {
  const [chartType, setChartType] = useState("Bar"); // State to track the chart type
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total job applications from the first API
        const jobApplicationStats = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/fetchJobApplicationStatistics`);
        const totalJobApplications = jobApplicationStats.data.totalJobApplications;

        // Fetch total rejected jobs from the second API
        const rejectedJobsStats = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/fetchTotalRejectedJobs`);
        const totalRejections = rejectedJobsStats.data.totalRejections;

        // Fetch total shortlisted applicants from the third API
        const shortlistedApplicants = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/getTotalShortlistedApplicants`);
        const totalShortlisted = shortlistedApplicants.data.totalShortlisted;

        // Define labels for each API field (excluding Recent Jobs Count)
        const labels = ["Total Job Applications", "Total Rejections", "Total Shortlisted"];

        // Set data for the chart with values corresponding to each label
        setData({
          labels,
          datasets: [
            {
              label: "Job and Applicant Data",
              data: [totalJobApplications, totalRejections, totalShortlisted], // Corresponding API values
              borderColor: ["#1967d2", "#FF0000", "#32CD32"],
              backgroundColor: ["#1967d2", "#FF0000", "#32CD32"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Event handler for dropdown change
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  // Chart component to render based on the selected chart type
  const renderChart = () => {
    switch (chartType) {
      case "Line":
        return <Line options={options} data={data} />;
      case "Bar":
        return <Bar options={options} data={data} />;
      case "Pie":
        return <Pie options={options} data={data} />;
      default:
        return <Bar options={options} data={data} />;
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Your Job and Applicant Stats</h4>
        <div className="chosen-outer">
          {/* Dropdown for selecting chart type */}
          <select className="chosen-single form-select" onChange={handleChartTypeChange}>
            <option value="Bar">Bar Chart</option>
            <option value="Line">Line Chart</option>
            <option value="Pie">Pie Chart</option>
          </select>
        </div>
      </div>
      {/* End widget top bar */}

      <div className="widget-content">{renderChart()}</div>
      {/* End profile chart */}
    </div>
  );
};

export default ProfileChart;
