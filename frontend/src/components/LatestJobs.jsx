import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="max-w-7xl mx-auto my-20 px-4">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Latest & Top{" "}
          <span className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 bg-clip-text text-transparent">
            Job Openings
          </span>
        </h1>
        <p className="mt-2 text-gray-600 max-w-xl">
          Discover the most recent opportunities from top companies.
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length <= 0 ? (
          <span className="text-gray-500">No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
