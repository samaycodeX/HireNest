import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Menu, User2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  // console.log(user)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="relative z-30 flex items-center justify-between px-4 py-4 sm:px-6 lg:px-20">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-900">
        Hire
        <span className={`text-3xl font-bold ${textGradient}`}>Nest.</span>
      </h1>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <X /> : <Menu />}
      </Button>

      <div className={`${isMenuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-5 border-y border-gray-100 bg-white px-4 py-5 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-10 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
        {/* Nav links */}
        <ul className="flex flex-col gap-4 font-medium md:flex-row md:gap-12">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link to="/admin/homeadmin" className={navLink} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin/companies" className={navLink} onClick={() => setIsMenuOpen(false)}>
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/admin/jobs" className={navLink} onClick={() => setIsMenuOpen(false)}>
                  Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className={navLink} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className={navLink} onClick={() => setIsMenuOpen(false)}>
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/browse" className={navLink} onClick={() => setIsMenuOpen(false)}>
                  Browse
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right section */}
        {!user ? (
          <div className="flex gap-3">
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
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
                  src={user?.profile?.profilePhoto|| "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
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
                      src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                      alt="user"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-xs text-muted-foreground">
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
