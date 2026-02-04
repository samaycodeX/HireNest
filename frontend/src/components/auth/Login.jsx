import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  const textGradient =
    "bg-gradient-to-r from-fuchsia-200 to-white bg-clip-text text-transparent";

  const inputClass =
    "h-11 border border-gray-100 shadow-sm shadow-black/10 focus-visible:ring-fuchsia-500";

  return (
    <div className="flex justify-between bg-gray-50 min-h-screen">
      {/* LEFT — Form */}
      <div className="flex items-center justify-center px-20 w-1/2 pt-10">
        <form onSubmit={submitHandler} className="w-full max-w-sm">
          <h2 className="text-3xl font-semibold text-gray-900">
            Login
          </h2>
          <p className="text-gray-500 mt-1 mb-8">
            Get started in less than a minute.
          </p>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <Label>
                Email <span className="text-red-600">*</span>
              </Label>
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
            </div>
          </div>

          {/* Role */}
          <div className="flex gap-6 mt-6">
            <Label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeHandler}
              />
              Student
            </Label>

            <Label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeHandler}
              />
              Recruiter
            </Label>

            <span className="text-red-600">*</span>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/30 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-fuchsia-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* RIGHT — Branding */}
      <div className="hidden lg:flex flex-col px-20 bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 text-white w-1/2">
        <div className="flex justify-between items-center pt-7">
          <h1 className="text-2xl font-bold">
            Hire{" "}
            <span className={`text-3xl font-bold ${textGradient}`}>
              Nest.
            </span>
          </h1>

          <Link to="/" className={`font-bold text-lg ${textGradient}`}>
            Home
          </Link>
        </div>

        <div className="mt-32">
          <h1 className="text-7xl font-bold leading-tight">
            Find Jobs Where <br />
            Diversity{" "}
            <span className="text-white/90">Thrives</span>
          </h1>

          <p className="mt-4 text-white/80 max-w-md">
            Join thousands of professionals discovering better opportunities,
            smarter hiring, and faster growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
