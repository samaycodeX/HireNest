import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <div
            className="
        group relative
        rounded-2xl
        bg-white
        border border-gray-200
        p-5
        shadow-md
        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1
      "
        >
            {/* TOP */}
            <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>

                <Button
                    variant="ghost"
                    size="icon"
                    className="
            rounded-full
            text-gray-500
            hover:text-fuchsia-600
            hover:bg-fuchsia-50
          "
                >
                    <Bookmark className="h-5 w-5" />
                </Button>
            </div>

            {/* COMPANY */}
            <div className="flex items-center gap-3 mt-4">
                <div
                    className="
            p-2 rounded-xl
            border border-gray-200
            bg-gray-50
          "
                >
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900">
                        {job?.company?.name}
                    </h3>
                    <p className="text-xs text-gray-500">India</p>
                </div>
            </div>

            {/* TITLE & DESC */}
            <div className="mt-4">
                <h2
                    className="
            font-bold text-lg text-gray-900
            group-hover:text-fuchsia-600
            transition
          "
                >
                    {job?.title}
                </h2>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {job?.description}
                </p>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="text-blue-700 border-blue-200">
                    {job?.position} Positions
                </Badge>

                <Badge variant="outline" className="text-orange-600 border-orange-200">
                    {job?.jobType}
                </Badge>

                <Badge variant="outline" className="text-fuchsia-700 border-fuchsia-200">
                    {job?.salary}LPA
                </Badge>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">
                <Button
                    variant="outline"
                    className="
            flex-1
            border-gray-300
            hover:border-fuchsia-400
            hover:text-fuchsia-600
          "
                    onClick={() => navigate(`/description/${job?._id}`)}
                >
                    Details
                </Button>

                <Button
                    className="
            flex-1
            bg-gradient-to-r from-fuchsia-500 to-fuchsia-700
            text-white
            shadow-md shadow-fuchsia-500/30
            hover:shadow-lg hover:shadow-fuchsia-500/40
            transition-all
          "
                >
                    Save For Later
                </Button>
            </div>

            {/* GLOW */}
            <div
                className="
          pointer-events-none
          absolute -inset-0.5
          rounded-2xl
          bg-gradient-to-r from-fuchsia-400 to-purple-500
          opacity-0
          blur
          group-hover:opacity-20
          transition
        "
            />
        </div>
    );
};

export default Job;
