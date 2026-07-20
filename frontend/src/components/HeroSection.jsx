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
        <section className="flex items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
            <div className="grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">

                {/* LEFT CONTENT */}
                <div className="animate-fade-up text-center lg:text-left">
                    <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-7xl">
                        Build Your{" "}
                        <span className="bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent">
                            Future
                        </span>{" "}
                        Faster
                    </h1>

                    <p className="mx-auto mt-6 max-w-md text-gray-600 lg:mx-0">
                        Discover jobs, build resumes, and connect with top companies — all in one place.
                    </p>



                    {/* SEARCH BAR */}
                    <div className="mx-auto mt-8 flex w-full max-w-md items-center gap-3 rounded-full border border-gray-200 bg-white pl-4 shadow-lg lg:mx-0">
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

                <Avatar className="mx-auto h-auto w-full max-w-md lg:max-w-none">
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


