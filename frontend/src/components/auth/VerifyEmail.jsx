import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const { user } = useSelector((store) => store.auth);

    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");
        const emailFromUrl = searchParams.get("email");

        if (tokenFromUrl && emailFromUrl) {
            handleVerify
                (null,tokenFromUrl, emailFromUrl);
        }
    }, []);

    const resendVerification = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${USER_API_END_POINT}/resend-verification-link`,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                // navigate("/")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e, tokenParam, emailParam) => {
        if (e) e.preventDefault();

        const finalToken = tokenParam || token;
        const finalEmail = emailParam || user?.email;

        if (!finalToken || finalToken.length !== 4) {
            return toast.error("Invalid verification code");
        }

        if (!finalEmail) {
            return toast.error("Email not found");
        }

        try {
            setLoading(true);

            const res = await axios.get(
                `${USER_API_END_POINT}/verify-email-token`,
                {
                    params: {
                        token: finalToken,
                        email: finalEmail
                    }
                }
            );

            if (res.data.success) {
                toast.success("Email verified successfully 🎉");
                navigate("/profile");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <Navbar />
            <div className=" min-h-screen -mt-20 flex items-center justify-center bg-gray-50 px-4">

                <div className="w-full max-w-lg space-y-6 bg-white rounded-2xl shadow-md border border-gray-100 p-6">

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-center text-gray-900">
                        Verify Your Email
                    </h1>

                    {/* Status Card */}
                    <div className="">
                        {user ? (
                            <div className="flex items-center gap-3 text-green-600 font-medium">
                                <span className="text-xl">✔</span>
                                <span>You are logged in</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 text-yellow-600 font-medium">
                                <span className="text-xl">⚠</span>
                                <span>You are not logged in</span>
                            </div>
                        )}

                        <p className="mt-4 text-gray-600">
                            <strong>Email:</strong>{" "}
                            <span className="text-gray-900">{user?.email}</span>
                        </p>

                        <p className="mt-3 text-gray-500 text-sm">
                            Your email has not been verified yet. Please enter the 4-digit code
                            sent to your email or request a new verification link.
                        </p>

                        <Button
                            onClick={resendVerification}
                            disabled={loading}
                            className="mt-4  bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 text-white hover:shadow-lg hover:shadow-fuchsia-500/30"
                        >
                            Resend Verification Link
                        </Button>
                    </div>

                    {/* Verification Form */}
                    <div className="">
                        <form
                            onSubmit={handleVerify}
                            className="space-y-4">
                            <div>
                                <Label>
                                    Enter 4-Digit Verification Code
                                </Label>

                                <Input
                                    type="text"
                                    maxLength={4}
                                    value={token}
                                    onChange={(e) =>
                                        setToken(e.target.value.replace(/\D/g, ""))
                                    }
                                    placeholder="1234"
                                    className="h-11 border border-gray-200 focus-visible:ring-fuchsia-500"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/30 hover:scale-[1.01]"
                            >
                                Verify Code
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default VerifyEmail;
