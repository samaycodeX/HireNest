import React, { useState } from "react";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";

const UpdatePassword = () => {

    const navigate = useNavigate();
    const [showpreviousPassword, setShowpreviousPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [passwordValidation, setPasswordValidation] = useState({});

    const [input, setInput] = useState({
        previousPassword: "",
        newPassword: ""
    });

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

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const validation = validatePassword(input.newPassword);

        if (!validation.isValid) {
            setPasswordValidation(validation);
            setValidPassword(false);
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update-password`,
                input,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success("Password updated successfully 🎉");
                navigate("/profile");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (<>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 -mt-20">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

                {/* Header */}
                <div className="text-center mb-6">
                   
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Update Password
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Keep your account secure by updating your password.
                    </p>
                </div>

                <form onSubmit={submitHandler} className="space-y-5">

                    {/* Previous Password */}
                    <div>
                        <Label>Current Password</Label>
                        <div className="relative mt-1">
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="previousPassword"
                                value={input.previousPassword}
                                onChange={changeHandler}
                                placeholder="••••••••"
                                className="h-11 focus-visible:ring-fuchsia-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <Label>New Password</Label>
                        <div className="relative mt-1">
                            <Input
                                type={showpreviousPassword ? "text" : "password"}
                                name="newPassword"
                                value={input.newPassword}
                                onChange={changeHandler}
                                placeholder="••••••••"
                                className="h-11 focus-visible:ring-fuchsia-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowpreviousPassword(!showpreviousPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showpreviousPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                           
                            <Link
                                to="/reset-password"
                                className="text-fuchsia-600 font-medium hover:underline"
                            >
                                Forgot Password? 
                            </Link>
                        </p>

                        {!validPassword && (
                            <div className="mt-3 text-sm space-y-1">
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

                    {/* Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 text-white hover:shadow-lg hover:shadow-fuchsia-500/30 transition-all duration-300"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            "Update Password"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    </>
    );
};

export default UpdatePassword;
