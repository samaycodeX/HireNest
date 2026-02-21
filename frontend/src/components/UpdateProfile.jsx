import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        resume: null,
        profilePhoto: null,
    });

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (input.resume) formData.append("resume", input.resume);
        if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);

        try {
            setLoading(true);

            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                { withCredentials: true }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/profile");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-10 px-4">
                <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        Update Profile
                    </h1>

                    <form onSubmit={submitHandler} className="space-y-3">

                        <div>
                            <Label>Full Name</Label>
                            <Input
                                name="fullname"
                                value={input.fullname}
                                onChange={changeHandler}
                                className="h-11 mt-1 focus-visible:ring-fuchsia-500"
                            />
                        </div>

                        <div>
                            <Label>Phone Number</Label>
                            <Input
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeHandler}
                                className="h-11 mt-1 focus-visible:ring-fuchsia-500"
                            />
                        </div>

                        <div>
                            <Label>Bio</Label>
                            <Input
                                name="bio"
                                value={input.bio}
                                onChange={changeHandler}
                                className="h-11 mt-1 focus-visible:ring-fuchsia-500"
                            />
                        </div>

                        <div>
                            <Label>Skills (comma separated)</Label>
                            <Input
                                name="skills"
                                value={input.skills}
                                onChange={changeHandler}
                                className="h-11 mt-1 focus-visible:ring-fuchsia-500"
                            />
                        </div>

                        <div>
                            <Label>Resume (PDF)</Label>
                            <Input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) =>
                                    setInput({ ...input, resume: e.target.files?.[0] })
                                }
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Profile Photo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setInput({ ...input, profilePhoto: e.target.files?.[0] })
                                }
                                className="mt-1"
                            />
                        </div>

                        <div className="pt-4 space-y-3">

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 text-white hover:shadow-lg hover:shadow-fuchsia-500/30 transition-all"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Profile"
                                )}
                            </Button>

                            <Link
                                to="/update-password"
                                className="block text-center text-fuchsia-600 font-medium hover:underline"
                            >
                                Change Password
                            </Link>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateProfile;
