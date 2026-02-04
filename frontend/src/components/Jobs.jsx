import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-fuchsia-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-20">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
            Explore{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h1>
          <p className="mt-2 text-gray-600 max-w-lg">
            Find jobs that match your skills, passion, and career goals.
          </p>
        </div>

        <div className="flex gap-10">
          {/* FILTER */}
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div
              className="
                sticky top-28
                rounded-2xl
                bg-white/70 backdrop-blur-xl
                border border-gray-200
                shadow-lg shadow-fuchsia-200/40
                p-5
              "
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Filters
              </h3>
              <FilterCard />
            </div>
          </aside>

          {/* JOB LIST */}
          <main className="flex-1">
            {filterJobs.length <= 0 ? (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                <div
                  className="
                    w-20 h-20 mb-6
                    rounded-full
                    bg-gradient-to-r from-fuchsia-400 to-fuchsia-600
                    flex items-center justify-center
                    text-white text-3xl
                    shadow-lg shadow-fuchsia-500/40
                  "
                >
                  🔍
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  No jobs found
                </h2>
                <p className="mt-2 text-gray-500 max-w-sm">
                  Try adjusting filters or search keywords.
                </p>
              </div>
            ) : (
              <div className="h-[75vh] overflow-y-auto pr-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 pb-8">
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="relative group"
                    >
                      {/* Glow */}
                      <div
                        className="
                          absolute -inset-0.5
                          rounded-2xl
                          bg-gradient-to-r from-fuchsia-400 to-purple-500
                          opacity-0 group-hover:opacity-30
                          blur
                          transition
                        "
                      />
                      <div className="relative">
                        <Job job={job} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
