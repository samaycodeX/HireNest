import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import heroProfile from "@/assets/Hero-profile.png";

export default function Hero() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <section className="py-10 flex items-center justify-center px-10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-7xl">

                {/* LEFT CONTENT */}
                <div className="animate-fade-up">
                    <h1 className="text-7xl font-extrabold leading-tight text-gray-900">
                        Build Your{" "}
                        <span className="bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent">
                            Future
                        </span>{" "}
                        Faster
                    </h1>

                    <p className="mt-6 text-gray-600 max-w-md text-center">
                        Discover jobs, build resumes, and connect with top companies — all in one place.
                    </p>



                    {/* SEARCH BAR */}
                    <div className="mt-8 flex w-full max-w-md shadow-lg border border-gray-200 pl-4 rounded-full items-center gap-3 bg-white">
                        <input
                            type="text"
                            placeholder="Find your dream jobs"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="outline-none border-none w-full py-3 bg-transparent"
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="rounded-full bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 text-white px-4 py-3 shadow-md hover:scale-105 transition"
                        >
                            <Search className="h-5 w-5" />
                        </Button>

                    </div>
                </div>

                <Avatar className="w-full h-full -m-5">
                    <AvatarImage
                        src={heroProfile}
                        alt="profile"
                        className="object-cover"
                    />
                </Avatar>

            </div>
        </section>
    );
}


