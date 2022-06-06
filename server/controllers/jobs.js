const getAllJobs = async (req, res) => {
  res.send("Get all jobs");
};

const createJob = async (req, res) => {
  res.send("Create job");
};

const updateJob = async (req, res) => {
  res.send("Update job");
};

const deleteJob = async (req, res) => {
  res.send("Delete job");
};

const showStats = async (req, res) => {
  res.send("Show stats");
};

export { getAllJobs, createJob, updateJob, deleteJob, showStats };
