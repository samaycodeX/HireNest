import mongoose from "mongoose";
import dotenv from "dotenv";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const jobTitles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "MERN Stack Developer",
  "DevOps Engineer",
  "Software Engineer",
  "Data Analyst",
  "AI Engineer",
  "Mobile App Developer",
  "Cloud Engineer"
];

const jobTypes = ["Full-time", "Part-time", "Internship", "Remote"];
const experienceLevels = ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"];
const locations = [
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Delhi",
  "Pune",
  "Chennai",
  "Ahmedabad",
  "Noida",
  "Jaipur"
];

const requirementsPool = [
  "JavaScript",
  "React.js",
  "Node.js",
  "MongoDB",
  "Express.js",
  "REST APIs",
  "Git",
  "Docker",
  "AWS",
  "Problem Solving",
  "Data Structures",
  "System Design"
];

const seedJobs = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    await Job.deleteMany();

    const companies = await Company.find();

    if (!companies.length) {
      console.log("❌ No companies found. Seed companies first.");
      process.exit();
    }

    const jobs = [];

    for (let i = 0; i < 100; i++) {
      const randomCompany =
        companies[Math.floor(Math.random() * companies.length)];

      const randomRequirements = requirementsPool
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      jobs.push({
        title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
        description:
          "We are looking for a skilled developer to join our growing team and build scalable applications.",
        requirements: randomRequirements,
        salary: Math.floor(Math.random() * 15 + 5) * 100000, // 5L - 20L
        experienceLevel:
          experienceLevels[
            Math.floor(Math.random() * experienceLevels.length)
          ],
        location: locations[Math.floor(Math.random() * locations.length)],
        jobType: jobTypes[Math.floor(Math.random() * jobTypes.length)],
        positions: Math.floor(Math.random() * 5) + 1,
        company: randomCompany._id,
        created_by: randomCompany.userId,
        applications: []
      });
    }

    await Job.insertMany(jobs);

    console.log("🚀 100 Jobs Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedJobs();