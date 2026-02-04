import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
    const params = useParams(); 
    useGetCompanyById(params.id);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        logo: null,
    });

    const { singleCompany } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const logo = e.target.files?.[0];
        setInput({ ...input, logo });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.logo) {
            formData.append("logo", input.logo);
        }

        try {
            setLoading(true);
            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            logo: singleCompany.logo || null,
        });
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-fuchsia-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-12">
                <form
                    onSubmit={submitHandler}
                    className="
            bg-white
            rounded-2xl
            border border-gray-200
            shadow-xl shadow-fuchsia-200/40
            p-10
          "
                >
                    {/* HEADER */}
                    <div className="flex items-center gap-4 mb-10">
                        <Button
                            onClick={() => navigate("/admin/companies")}
                            variant="outline"
                            className="
                flex items-center gap-2
                rounded-full
                border-gray-300
                hover:bg-gray-100
              "
                        >
                            <ArrowLeft size={18} />
                            Back
                        </Button>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Company Setup
                            </h1>
                            <p className="text-sm text-gray-500">
                                Update your company details and branding
                            </p>
                        </div>
                    </div>

                    {/* FORM GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="h-11 focus-visible:ring-fuchsia-500"
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="h-11 focus-visible:ring-fuchsia-500"
                            />
                        </div>

                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="h-11 focus-visible:ring-fuchsia-500"
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="h-11 focus-visible:ring-fuchsia-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label>Company Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="h-11 cursor-pointer"
                            />
                        </div>
                    </div>
 
                    {/* SUBMIT */}
                    <div className="mt-10">
                        {loading ? (
                            <Button className="w-full h-11">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="
                  w-full h-11
                  bg-gradient-to-r from-fuchsia-500 to-fuchsia-700
                  text-white
                  transition-all duration-300
                  hover:shadow-lg hover:shadow-fuchsia-500/30
                  hover:scale-[1.01]
                "
                            >
                                Update Company
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
