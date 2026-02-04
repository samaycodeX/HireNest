import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...singleJob.applications,
              { applicant: user?._id },
            ],
          })
        );

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-fuchsia-50">
       <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-6">

        {/* HEADER CARD */}
        <div
          className="
            bg-white/80 backdrop-blur-xl
            border border-gray-200
            rounded-2xl 
            shadow-xl shadow-fuchsia-100/40
            p-8
          "
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">
                {singleJob?.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="bg-blue-50 text-blue-700 border border-blue-200">
                  {singleJob?.position} Positions
                </Badge>
                <Badge className="bg-orange-50 text-orange-600 border border-orange-200">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>

            <Button
              onClick={isApplied ? undefined : applyJobHandler}
              disabled={isApplied}
              className={`
                px-6 h-11 rounded-xl font-medium
                transition-all duration-300
                ${
                  isApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 hover:shadow-lg hover:shadow-fuchsia-500/30 hover:scale-[1.02]"
                }
              `}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>

        {/* JOB DETAILS */}
        <div
          className="
            mt-10
            bg-white
            rounded-2xl
            border border-gray-200
            shadow-md
            p-8
          "
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6 border-b pb-4">
            Job Description
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <Info label="Role" value={singleJob?.title} />
            <Info label="Location" value={singleJob?.location} />
            <Info label="Experience" value={`${singleJob?.experience} yrs`} />
            <Info label="Salary" value={`${singleJob?.salary} LPA`} />
            <Info
              label="Total Applicants"
              value={singleJob?.applications?.length}
            />
            <Info
              label="Posted Date"
              value={singleJob?.createdAt?.split("T")[0]}
            />
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {singleJob?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium text-gray-900 mt-1">{value}</p>
  </div>
);

export default JobDescription;
