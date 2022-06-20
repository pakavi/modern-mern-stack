import React from "react";

import { FormRow, FormRowSelect, Alert } from "../../components/";
import { UseAppContext } from "../../context/appContext";

import Wrapper from "../../assets/wrappers/DashboardFormPage";


const AddJob = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    isEditing,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
  } = UseAppContext();

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if(isEditing) return;
    
    createJob();
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
      </form>
      {showAlert && <Alert />}
      <div className="form-center">
        <FormRow
          type="text"
          name="position"
          value={position}
          handleChange={handleJobInput}
        />
        <FormRow
          type="text"
          name="company"
          value={company}
          handleChange={handleJobInput}
        />
        <FormRow
          type="text"
          name="jobLocation"
          labelText="job location"
          value={jobLocation}
          handleChange={handleJobInput}
        />
        <FormRowSelect
          name="status"
          value={status}
          handleChange={handleJobInput}
          list={statusOptions}
        />
        <FormRowSelect
          name="jobType"
          labelText="job type"
          value={jobType}
          handleChange={handleJobInput}
          list={jobTypeOptions}
        />
        <div className="btn-container">
          <button
            type="submit"
            className="btn btn-block submit-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </button>
          <button
            className="btn btn-block clear-btn"
            onClick={(e) => {
              e.preventDefault();
              clearValues();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddJob;
