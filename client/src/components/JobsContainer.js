import React, { useEffect } from "react";

import { UseAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/JobsContainer";

import Loading from "./Loading";
import Job from "./Job";


const JobsContainer = () => {
  const { getJobs, jobs, isLoading, page, totalJobs } = UseAppContext();

  useEffect(() => {
    getJobs();
  }, []);

  if (isLoading) return <Loading center />;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;