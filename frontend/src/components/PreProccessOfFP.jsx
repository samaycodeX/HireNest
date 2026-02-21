import React, { useState } from "react";
import { AlertCircle, CheckCircle, Loader2, Mail } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";

const PreProccessOfFP = () => {

    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);

    const [loading, setLoading] = useState(false);
    const [isFormSubmit, setIsFormSubmit] = useState(false);
    const [input, setInput] = useState({ email: "" });
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });

        if (e.target.name === "email") {
            if (!validateEmail(e.target.value)) {
                setError("Please enter a valid email address");
            } else {
                setError("");
            }
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!validateEmail(input.email)) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(`${USER_API_END_POINT}/profile/reset-password`, input);

            if (res.data.success) {
                toast.success(res?.data?.message);
            }

            setIsFormSubmit(true);

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex items-center justify-center 
            bg-gradient-to-br from-fuchsia-100 via-white to-fuchsia-200 px-4 -mt-20">

                <div className="w-full max-w-md backdrop-blur-lg bg-white/80 
                shadow-2xl rounded-3xl border border-white/40 p-8 transition-all">

                    {/* Login Status Badge */}
                    <div className="flex justify-center mb-6">
                        {user ? (
                            <div className="flex items-center gap-2 bg-green-50 
                            text-green-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                                <CheckCircle size={18} />
                                Logged In
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 bg-yellow-50 
                            text-yellow-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                                <AlertCircle size={18} />
                                Not Logged In
                            </div>
                        )}
                    </div>

                    {isFormSubmit ? (

                        /* ✅ Success State */
                        <div className="text-center space-y-4 animate-fadeIn">
                            <div className="flex justify-center">
                                <div className="bg-green-100 p-4 rounded-full">
                                    <CheckCircle size={32} className="text-green-600" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Check Your Email
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                If the email you entered is registered with us,
                                we have sent a password reset link to your inbox.
                            </p>

                            <Button
                                onClick={() => navigate("/login")}
                                className="mt-4 w-full h-11 rounded-xl 
                                bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 
                                text-white hover:shadow-lg hover:shadow-fuchsia-500/30 transition-all"
                            >
                                Back to Login
                            </Button>
                        </div>

                    ) : (

                        /* 📨 Email Form */
                        <div>
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Forgot Password?
                                </h1>
                                <p className="text-gray-600 text-sm mt-2">
                                    Enter your registered email and we’ll send you a reset link.
                                </p>
                            </div>

                            <form onSubmit={submitHandler} className="space-y-6">

                                <div>
                                    <Label className="flex gap-2 mb-2 text-gray-700">
                                        <Mail size={16} />
                                        Email Address
                                    </Label>

                                    <Input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeHandler}
                                        placeholder="Enter your registered email"
                                        className="h-12 rounded-xl border-gray-200 
                                        focus-visible:ring-fuchsia-500"
                                    />
                                    {error && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {error}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 rounded-xl 
                                    bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 
                                    text-white font-semibold
                                    hover:shadow-xl hover:shadow-fuchsia-500/30 
                                    transition-all duration-300"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PreProccessOfFP;
