import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { Plus, Search } from "lucide-react";

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-fuchsia-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            Manage{" "}
                            <span className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 bg-clip-text text-transparent">
                                Companies
                            </span>
                        </h1>
                        <p className="mt-1 text-gray-600 text-sm">
                            View, search and manage registered companies
                        </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-4">
                        {/* SEARCH */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search company..."
                                onChange={(e) => setInput(e.target.value)}
                                className="
                  pl-9
                  h-10
                  w-64
                  border-gray-200
                  focus-visible:ring-fuchsia-500
                "
                            />
                        </div>

                        {/* ADD COMPANY */}
                        <Button
                            onClick={() => navigate("/admin/companies/create")}
                            className="
                h-10
                px-5
                bg-gradient-to-r from-fuchsia-500 to-fuchsia-700
                text-white
                font-medium
                transition-all duration-300
                hover:shadow-lg hover:shadow-fuchsia-500/30
                hover:scale-[1.02]
              "
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            New Company
                        </Button>
                    </div>
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
                    <CompaniesTable />
                </div>
            </div>
        </div>
    );
};

export default Companies;
