import { readFile } from "fs/promises";

import Job from "../models/job.js";
import connectDB from "../db/connectDB.js";


const populateDB = async () => {
    try {
        const jobsJSON = JSON.parse(await readFile(new URL("./data.json", import.meta.url)));
        
        await connectDB(process.env.MONGO_URL);
        await Job.deleteMany();
        await Job.create(jobsJSON);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default populateDB;
