import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Assuming you're using Next.js
import Link from "next/link";
import jobs from "../../../data/job-featured";
import { useDispatch, useSelector } from "react-redux";
import {
    addCategory,
    addDatePosted,
    addDestination,
    addKeyword,
    addLocation,
    addPerPage,
    addSalary,
    addSort,
    addTag,
    clearExperience,
    clearJobType,
} from "../../../features/filter/filterSlice";
import {
    clearDatePostToggle,
    clearExperienceToggle,
    clearJobTypeToggle,
} from "../../../features/job/jobSlice";
import { Config } from '../../../config';

const FilterJobsBox = () => {
    const [jobs, setJobs] = useState([]); // State to hold job data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch jobs from backend
    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/getAllJobs');
            setJobs(response.data); // Assuming response.data is an array of jobs
        } catch (err) {
            setError(err.message || 'Failed to fetch jobs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs(); // Fetch jobs when component mounts
    }, []);

    const { jobList, jobSort } = useSelector((state) => state.filter);
    const {
        keyword,
        location,
        destination,
        category,
        jobType,
        datePosted,
        experience,
        salary,
        tag,
    } = jobList || {};

    const { sort, perPage } = jobSort;

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error}</h1>;



    // Filter functions
    const keywordFilter = (item) =>
        keyword !== ""
            ? item.jobTitle.toLowerCase().includes(keyword.toLowerCase())
            : true;

    const locationFilter = (item) =>
        location !== ""
            ? item.location.toLowerCase().includes(location.toLowerCase())
            : true;

    const destinationFilter = (item) =>
        item.destination?.min >= destination?.min &&
        item.destination?.max <= destination?.max;

    const categoryFilter = (item) =>
        category !== ""
            ? item.category.toLowerCase() === category.toLowerCase()
            : true;

    const jobTypeFilter = (item) =>
        jobType?.length !== 0 && item.jobType
            ? jobType.includes(item.jobType[0]?.type.toLowerCase().replace(/\s+/g, '-'))
            : true;

    const datePostedFilter = (item) =>
        datePosted !== "all" && datePosted !== ""
            ? new Date(item.created_at).toLocaleDateString().includes(datePosted)
            : true;

    const experienceFilter = (item) =>
        experience?.length !== 0
            ? experience.includes(item.experience.toLowerCase().replace(/\s+/g, '-'))
            : true;

    const salaryFilter = (item) =>
        item.totalSalary?.min >= salary.min && item.totalSalary?.max <= salary.max;

    const tagFilter = (item) => (tag !== "" ? item.tag === tag : true);

    // Sort function
    const sortFilter = (a, b) => {
        if (sort === "des") return b.id - a.id; // Descending order
        return a.id - b.id; // Ascending order
    };

    // Filter and sort jobs
    let content = jobs
        .slice(perPage.start, perPage.end !== 0 ? perPage.end : perPage.start + 10)
        .map((item) => (
            <div className="job-block" key={item.id}>
                <div className="inner-box">
                    <div className="content">
                        <span className="company-logo">
                            <img
                                src="/images/hexaware.png"
                                alt="logo"
                                style={{
                                    borderRadius: '25%', // Make it circular
                                    objectFit: 'cover' // Ensure the image covers the container without distortion
                                }}
                            />
                        </span>
                        <h4>
                            <Link href={`/job/${item.jobId}`}>
                                {item.jobTitle}
                            </Link>
                        </h4>

                        <ul className="job-info">
                            <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item.companyName}
                            </li>
                            {/* Company info */}
                            <li>
                                <span className="icon flaticon-map-locator"></span>
                                {item.city}
                            </li>
                            {/* Location info */}
                            <li>
                                <span className="icon flaticon-clock-3"></span>{" "}
                                {new Date(item.datePosted).toLocaleDateString()}
                            </li>
                            {/* Date Posted info */}
                            <li>
                                <span className="icon flaticon-money"></span>{" "}
                                ${item.offeredSalary}
                            </li>
                            {/* Salary info */}
                        </ul>
                        {/* End .job-info */}

                        <ul className="job-other-info">
                            {Array.isArray(item?.jobType) ? (
                                item.jobType.map((val, i) => (
                                    <div key={i} className={`${val.styleClass}`}>
                                        {val.type}
                                    </div>
                                ))
                            ) : (
                                <li>{item?.jobType || 'No job type listed'}</li> // Handle non-array case
                            )}
                        </ul>
                        {/* End .job-other-info */}

                        <button className="bookmark-btn">
                            <span className="flaticon-bookmark"></span>
                        </button>
                    </div>
                </div>
            </div>
            // End all jobs
        ));

    // sort handler
    const sortHandler = (e) => {
        dispatch(addSort(e.target.value));
    };

    // per page handler
    const perPageHandler = (e) => {
        const pageData = JSON.parse(e.target.value);
        dispatch(addPerPage(pageData));
    };

    // clear all filters
    const clearAll = () => {
        dispatch(addKeyword(""));
        dispatch(addLocation(""));
        dispatch(addDestination({ min: 0, max: 100 }));
        dispatch(addCategory(""));
        dispatch(clearJobType());
        dispatch(clearJobTypeToggle());
        dispatch(addDatePosted(""));
        dispatch(clearDatePostToggle());
        dispatch(clearExperience());
        dispatch(clearExperienceToggle());
        dispatch(addSalary({ min: 0, max: 20000 }));
        dispatch(addTag(""));
        dispatch(addSort(""));
        dispatch(addPerPage({ start: 0, end: 0 }));
    };

    return (
        <>
            <div className="ls-switcher">
                <div className="show-result">
                    <div className="show-1023">
                        <button
                            type="button"
                            className="theme-btn toggle-filters "
                            data-bs-toggle="offcanvas"
                            data-bs-target="#filter-sidebar"
                        >
                            <span className="icon icon-filter"></span> Filter
                        </button>
                    </div>
                    {/* Collapsible sidebar button */}

                    <div className="text">
                        Show <strong>{content?.length}</strong> jobs
                    </div>
                </div>
                {/* End show-result */}

                <div className="sort-by">
                    {keyword !== "" ||
                        location !== "" ||
                        destination?.min !== 0 ||
                        destination?.max !== 100 ||
                        category !== "" ||
                        jobType?.length !== 0 ||
                        datePosted !== "" ||
                        experience?.length !== 0 ||
                        salary?.min !== 0 ||
                        salary?.max !== 20000 ||
                        tag !== "" ||
                        sort !== "" ||
                        perPage.start !== 0 ||
                        perPage.end !== 0 ? (
                        <button
                            onClick={clearAll}
                            className="btn btn-danger text-nowrap me-2"
                            style={{ minHeight: "45px", marginBottom: "15px" }}
                        >
                            Clear All
                        </button>
                    ) : undefined}

                    <select
                        value={sort}
                        className="chosen-single form-select"
                        onChange={sortHandler}
                    >
                        <option value="">Sort by (default)</option>
                        <option value="asc">Newest</option>
                        <option value="des">Oldest</option>
                    </select>
                    {/* End select */}

                    <select
                        onChange={perPageHandler}
                        className="chosen-single form-select ms-3 "
                        value={JSON.stringify(perPage)}
                    >
                        <option
                            value={JSON.stringify({
                                start: 0,
                                end: 0,
                            })}
                        >
                            All
                        </option>
                        <option
                            value={JSON.stringify({
                                start: 0,
                                end: 10,
                            })}
                        >
                            10 per page
                        </option>
                        <option
                            value={JSON.stringify({
                                start: 0,
                                end: 20,
                            })}
                        >
                            20 per page
                        </option>
                        <option
                            value={JSON.stringify({
                                start: 0,
                                end: 30,
                            })}
                        >
                            30 per page
                        </option>
                    </select>
                    {/* End select */}
                </div>
            </div>
            {/* End top filter bar box */}
            {content}
            {/* <!-- List Show More --> */}
            <div className="ls-show-more">
                <p>Show 36 of 497 Jobs</p>
                <div className="bar">
                    <span className="bar-inner" style={{ width: "40%" }}></span>
                </div>
                <button className="show-more">Show More</button>
            </div>
        </>
    );
};

export default FilterJobsBox;
