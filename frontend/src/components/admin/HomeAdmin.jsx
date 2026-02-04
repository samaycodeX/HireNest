import React from "react";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";

const HomeAdmin = () => {

    const {user} = useSelector(store=>store.auth);
    console.log(user);
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-fuchsia-50">
            <Navbar />

            <section className="flex items-center justify-center px-6 py-20">
                <div className="max-w-4xl w-full text-center animate-fade-up py-20">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
                        Welcome,{" "}
                        <span className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 bg-clip-text text-transparent">
                            {user?.fullname}
                        </span>
                    </h1>

                    <p className="mt-6 text-gray-600 max-w-xl mx-auto text-lg">
                        Use the navigation above to manage companies, jobs,
                        and applicants efficiently.
                    </p>

                    {/* INFO CARDS */}
                    {/* <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="
              bg-white
              border border-gray-200
              rounded-2xl
              p-6
              shadow-md
              hover:shadow-xl
              transition
            ">
                            <h3 className="font-bold text-gray-900">Companies</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Register and manage hiring companies
                            </p>
                        </div>

                        <div className="
              bg-white
              border border-gray-200
              rounded-2xl
              p-6
              shadow-md
              hover:shadow-xl
              transition
            ">
                            <h3 className="font-bold text-gray-900">Jobs</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Create and monitor job postings
                            </p>
                        </div>

                        <div className="
              bg-white
              border border-gray-200
              rounded-2xl
              p-6
              shadow-md
              hover:shadow-xl
              transition
            ">
                            <h3 className="font-bold text-gray-900">Applicants</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Review and shortlist candidates
                            </p>
                        </div>
                    </div> */}
                </div>
            </section>
        </div>
    );
};

export default HomeAdmin;
