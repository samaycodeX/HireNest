import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
                    { withCredentials: true }
                );
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, [dispatch, params.id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-fuchsia-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Applicants{" "}
                        <span className="text-gray-500 font-medium">
                            ({applicants?.applications?.length || 0})
                        </span>
                    </h1>
                    <p className="mt-1 text-gray-600 text-sm">
                        Review candidates who applied for this job
                    </p>
                </div>

                {/* TABLE CARD */}
                <div
                    className="
            rounded-2xl
            bg-white/80
            backdrop-blur-xl
            border border-gray-200
            shadow-xl shadow-fuchsia-200/40
            p-6
          "
                >
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    );
};

export default Applicants;
