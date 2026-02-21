import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/authSlice";

const CompleteProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [passwordValidation, setPasswordValidation] = useState({});

    const [input, setInput] = useState({
        phoneNumber: "",
        password: "",
        role: "",
    });

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
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

    const submitHandler = async (e) => {
        e.preventDefault();

        const validation = validatePassword(input.password);
        setPasswordValidation(validation);

        if (!validation.isValid) {
            setValidPassword(false);
            return;
        }

        setValidPassword(true);
        setLoading(true);

        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/complete-profile`,
                input,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);

                // update redux user
                dispatch(setUser(res.data.user));

                // role based navigation
                if (res.data?.user?.role === "recruiter") {
                    navigate("/admin/homeadmin");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Profile setup failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "h-11 border border-gray-100 shadow-sm shadow-black/10 focus-visible:ring-fuchsia-500";

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <div className="flex items-center justify-center px-20 w-full">
                <form onSubmit={submitHandler} className="w-full max-w-sm">
                    <h2 className="text-3xl font-semibold text-gray-900">
                        Complete Profile After Google Setup
                    </h2>
                    <p className="text-gray-500 mt-1 mb-8">
                        Get started in less than a minute.
                    </p>

                    {/* Phone */}
                    <div className="space-y-2">
                        <div>
                            <Label>Phone</Label>
                            <Input
                                type="tel"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeHandler}
                                placeholder="8080808080"
                                className={inputClass}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Label>
                                Password <span className="text-red-600">*</span>
                            </Label>
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
                                required
                            />
                            Recruiter
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="mt-8">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/30 hover:scale-[1.01] disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Setting up...
                                </>
                            ) : (
                                "Complete Setup"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompleteProfile;