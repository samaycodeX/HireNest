import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Flag, Loader2 } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT as AUTH_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

export default function Signup() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validPassword, setvalidPassword] = useState(true)
    const [passwordValidation, setpasswordValidation] = useState({})
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "", 
        role: "",
        profilePhoto: "",
    });

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, profilePhoto: e.target.files?.[0] });
    };
    const validatePassword = (password) => {
        const minLength = password.length >= 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        return {
            minLength,
            hasUpperCase,
            hasNumber,
            isValid: minLength && hasUpperCase && hasNumber
        };
    };



    const isFormValid =
        input.fullname &&
        input.email &&
        input.password &&
        input.role;

    const submitHandler = async (e) => {
        e.preventDefault();

        setpasswordValidation(validatePassword(input.password));

        if (!passwordValidation.isValid) {
            setvalidPassword(false);
            return;
        }

        setvalidPassword(true)

        if (!isFormValid) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password.trim());
        formData.append("role", input.role);

        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }

        try {
            const res = await axios.post(
                `${AUTH_API_END_POINT}/register`,
                formData,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };
    const oauthHandler = (e) => {
        window.location.href = `${USER_API_END_POINT}/${e}`;
    };

    const textGradient =
        "bg-gradient-to-r from-fuchsia-200 to-white bg-clip-text text-transparent";

    const inputClass =
        "h-11 border border-gray-100 shadow-sm shadow-black/10 focus-visible:ring-fuchsia-500";

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* LEFT SIDE */}
            <div className="hidden lg:flex flex-col px-20 bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 text-white w-1/2">
                <div className="flex justify-between items-center pt-7">
                    <h1 className="text-2xl font-bold">
                        Hire <span className={`text-3xl font-bold ${textGradient}`}>Nest.</span>
                    </h1>

                    <Link to="/" className={`font-bold text-lg ${textGradient}`}>
                        Home
                    </Link>
                </div>

                <div className="mt-32">
                    <h1 className="text-7xl font-bold leading-tight">
                        Build your career <br />
                        with <span className="text-white/90">HireNest</span>
                    </h1>

                    <p className="mt-4 text-white/80 max-w-md">
                        Join thousands of professionals discovering better opportunities,
                        smarter hiring, and faster growth.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center px-20 w-full lg:w-1/2 mt-10">
                <form onSubmit={submitHandler} className="w-full max-w-sm">
                    <h2 className="text-3xl font-semibold text-gray-900">
                        Create account
                    </h2>
                    <p className="text-gray-500 mt-1 mb-8">
                        Get started in less than a minute.
                    </p>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <Label>Full Name <span className="text-red-600">*</span></Label>
                            <Input
                                required
                                name="fullname"
                                value={input.fullname}
                                onChange={changeHandler}
                                placeholder="John Doe"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <Label>Email <span className="text-red-600">*</span></Label>
                            <Input
                                required
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeHandler}
                                placeholder="john@email.com"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <Label>Phone</Label>
                            <Input
                                type="tel"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeHandler}
                                placeholder="8080808080"
                                className={inputClass}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Label>Password <span className="text-red-600">*</span></Label>
                            <div className="relative">
                                <Input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={input.password}
                                    onChange={changeHandler}
                                    placeholder="••••••••"
                                    className={inputClass}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {!validPassword && (
                                <div className="mt-2 text-sm space-y-1">
                                    {!passwordValidation.minLength && (
                                        <p className="text-red-500">
                                            • At least 6 characters
                                        </p>
                                    )}
                                    {!passwordValidation.hasNumber && (
                                        <p className="text-red-500">
                                            • Contains a number
                                        </p>
                                    )}
                                    {!passwordValidation.hasUpperCase && (
                                        <p className="text-red-500">
                                            • Contains a capital letter
                                        </p>
                                    )}
                                </div>
                            )}


                        </div>
                    </div>

                    {/* Role */}
                    <div className="flex gap-6 mt-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === "student"}
                                onChange={changeHandler}
                                required
                            />
                            Student
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === "recruiter"}
                                onChange={changeHandler}
                            />
                            Recruiter
                        </label>
                        <span className="text-red-600">*</span>
                    </div>

                    {/* File */}
                    <div className="mt-5">
                        <Label>Profile Image</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className={`${inputClass} cursor-pointer`}
                        />
                    </div>

                    {/* Submit */}
                    <div className="mt-8">
                        <Button
                            type="submit"
                            disabled={!isFormValid || loading}
                            className="w-full h-11 bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/30 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                    </div>

                    {/* Footer */}
                    <p className="text-sm text-gray-600 text-center mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-fuchsia-600 font-medium hover:underline"
                        >
                            Log in
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-gray-200 w-full"></div>
                        <span className="text-sm text-gray-400">OR</span>
                        <div className="h-px bg-gray-200 w-full"></div>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="space-y-3 pb-10">

                        <Button
                            type="button"
                            onClick={() => oauthHandler("google")}
                            className="w-full h-11 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm"
                        >

                            <FaGoogle size={20} />
                            Continue with Google
                        </Button>

                        {/* <Button
                                  type="button"
                                  // onClick={() => oauthHandler("github")}
                                  className="w-full h-11 bg-black text-white hover:bg-gray-900 flex items-center justify-center gap-2"
                                >
                                  <FaGithub size={18} />
                                  Continue with GitHub
                                </Button>
                    
                                <Button
                                  type="button"
                                  // onClick={() => oauthHandler("facebook")}
                                  className="w-full h-11 bg-[#1877F2] text-white hover:bg-[#166FE5] flex items-center justify-center gap-2"
                                >
                                  <FaFacebook size={18} />
                                  Continue with Facebook
                                </Button> */}

                    </div>
                </form>
            </div>
        </div>
    );
}
