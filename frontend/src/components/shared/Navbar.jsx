import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const textGradient =
    "bg-gradient-to-r from-fuchsia-400 to-fuchsia-700 bg-clip-text text-transparent";

  const navLink =
    "inline-block relative transition-all duration-300 ease-out text-gray-900 " +
    "hover:bg-gradient-to-r hover:from-fuchsia-400 hover:to-fuchsia-600 " +
    "hover:bg-clip-text hover:text-transparent";

  return (
    <nav className="flex items-center justify-between px-20 py-4">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-900">
        Hire
        <span className={`text-3xl font-bold ${textGradient}`}>Nest.</span>
      </h1>

      <div className="flex items-center gap-10">
        {/* Nav links */}
        <ul className="flex gap-12 font-medium">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link to="/admin/homeadmin" className={navLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin/companies" className={navLink}>
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/admin/jobs" className={navLink}>
                  Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className={navLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className={navLink}>
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/browse" className={navLink}>
                  Browse
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right section */}
        {!user ? (
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer scale-110">
                <AvatarImage
                  className="object-cover"
                  src={user?.profile?.profilePhoto}
                  alt="user"
                />
              </Avatar>
            </PopoverTrigger>

            <PopoverContent
              className="
                w-80 mr-5 mt-2 rounded-xl
                border border-gray-100
                shadow-xl shadow-black/10
              "
            >
              <div className="space-y-4">
                {/* User info */}
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage
                      className="object-cover"
                      src={user?.profile?.profilePhoto}
                      alt="user"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 size={18} />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut size={18} />
                    <Button variant="link" onClick={logoutHandler}>
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
