import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-fuchsia-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
            Search Results{" "}
            <span className="text-gray-500 font-medium">
              ({allJobs.length})
            </span>
          </h1>
          <p className="mt-2 text-gray-600 max-w-lg">
            Explore jobs that best match your search and preferences.
          </p>
        </div>

        {/* CONTENT */}
        {allJobs.length === 0 ? (
          /* EMPTY STATE */
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
              Try searching with different keywords or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {allJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                  ease: "easeOut",
                }}
                className="group relative"
              >
                {/* Glow */}
                <div
                  className="
                    absolute -inset-0.5
                    rounded-2xl
                    bg-gradient-to-r from-fuchsia-400 to-purple-500
                    opacity-0
                    blur
                    group-hover:opacity-25
                    transition
                  "
                />

                <div className="relative">
                  <Job job={job} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
