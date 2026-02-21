import React, { useState } from "react";
import { CheckCircle, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false)
    const { user } = useSelector((store) => store.auth);
    const { token } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [passwordValidation, setPasswordValidation] = useState({});
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const [input, setInput] = useState({
        newPassword: "",
        confirmPassword: ""
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

        if (input.newPassword !== input.confirmPassword) {
            setPasswordMatchError(true);
            return;
        }

        setPasswordMatchError(false);

        try {
            setLoading(true);

            const res = await axios.post(
                `${USER_API_END_POINT}/profile/reset-password/${token}`,
                { newPassword: input.newPassword }
            );

            if (res.data.success) {
                toast.success(res?.data?.message);
                setIsSubmit(true)
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-100 via-white to-fuchsia-200 px-4 -mt-20">

                {!isSubmit ? (
                    <div className="w-full max-w-md backdrop-blur-lg bg-white/80 shadow-2xl rounded-3xl border border-white/40 p-8">

                        {/* Header */}
                        <div className="text-center mb-8">

                            <h1 className="text-3xl font-bold text-gray-900">
                                Reset Password
                            </h1>
                            <p className="text-gray-600 text-sm mt-2">
                                Create a strong password to secure your account.
                            </p>

                            <div className="mt-5 inline-block px-4 py-2 rounded-full text-sm font-medium 
                        bg-white shadow-sm border border-gray-200">
                                {user ? (
                                    <span className="text-green-600">✔ Logged In</span>
                                ) : (
                                    <span className="text-yellow-600">⚠ Not Logged In</span>
                                )}
                            </div>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">

                            {/* New Password */}
                            <div>
                                <Label className="text-gray-700">New Password</Label>
                                <div className="relative mt-2">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={input.newPassword}
                                        onChange={changeHandler}
                                        placeholder="Enter new password"
                                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-fuchsia-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {!validPassword && (
                                    <div className="mt-3 text-sm space-y-1">
                                        {!passwordValidation.minLength && (
                                            <p className="text-red-500">• Minimum 6 characters</p>
                                        )}
                                        {!passwordValidation.hasNumber && (
                                            <p className="text-red-500">• Must include a number</p>
                                        )}
                                        {!passwordValidation.hasUpperCase && (
                                            <p className="text-red-500">• Must include uppercase letter</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <Label className="text-gray-700">Confirm Password</Label>
                                <div className="relative mt-2">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={input.confirmPassword}
                                        onChange={changeHandler}
                                        placeholder="Confirm password"
                                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-fuchsia-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {passwordMatchError && (
                                    <p className="text-red-500 text-sm mt-2">
                                        Passwords do not match
                                    </p>
                                )}
                            </div>

                            {/* Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 rounded-xl bg-gradient-to-r 
                            from-fuchsia-500 to-fuchsia-700 text-white font-semibold
                            hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Resetting...
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>

                        </form>
                    </div>
                ) : (
                    <div className="w-full max-w-md bg-white/90 
      backdrop-blur-xl p-8 rounded-3xl 
      shadow-[0_20px_60px_-15px_rgba(34,197,94,0.4)] 
      border border-white/50 text-center space-y-5">

                        <div className="mx-auto h-16 w-16 flex items-center justify-center 
        rounded-full bg-green-100 shadow-md">
                            <CheckCircle size={32} className="text-green-600" />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900">
                            Password Updated 🎉
                        </h2>

                        <p className="text-gray-600 text-sm">
                            Your password has been successfully reset.
                            You can now login using your new credentials.
                        </p>

                        <Button
                            onClick={() => navigate("/login")}
                            className="w-full h-11 rounded-xl 
          bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 
          text-white hover:shadow-lg hover:shadow-fuchsia-500/30"
                        >
                            Go to Login
                        </Button>
                    </div>
                )}

            </div>
        </>
    );
};

export default ForgotPassword;
