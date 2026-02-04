import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        positions: 0,
        company: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector((store) => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (companies.length === 0) {
            toast.error("Please register a company first");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                ...input,
                salary: Number(input.salary),
                positions: Number(input.positions),
            };

            const res = await axios.post(
                `${JOB_API_END_POINT}/post`,
                payload,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-fuchsia-50">
            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-12">
                <form
                    onSubmit={submitHandler}
                    className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-fuchsia-200/40 p-10"
                >
                    {/* HEADER */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Post a New Job
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Fill in the job details to attract the right candidates
                        </p>
                    </div>

                    {/* FORM GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label>Title</Label>
                            <Input
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Requirements (comma separated)</Label>
                            <Input
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                name="experienceLevel"
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>No. of Positions</Label>
                            <Input
                                type="number"
                                name="positions"
                                value={input.positions}
                                onChange={changeEventHandler}
                            />
                        </div>

                        {/* COMPANY SELECT */}
                        {companies.length > 0 && (
                            <div className="md:col-span-2">
                                <Label>Company</Label>
                                <Select
                                    value={input.company}
                                    onValueChange={(value) =>
                                        setInput({ ...input, company: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company._id}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {/* SUBMIT */}
                    <div className="mt-10">
                        <Button
                            type="submit"
                            disabled={loading || companies.length === 0}
                            className="w-full h-11 bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 text-white"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                "Post New Job"
                            )}
                        </Button>
                    </div>

                    {companies.length === 0 && (
                        <p className="text-xs text-red-600 font-semibold text-center mt-4">
                            * Please register a company before posting a job
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
