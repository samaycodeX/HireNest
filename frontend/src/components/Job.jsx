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
        <div className="bg-white border rounded-xl shadow-sm p-5 w-full max-w-sm h-[340px] flex flex-col justify-between">

            {/* TOP */}
            <div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <p>
                        {daysAgoFunction(job?.createdAt) === 0
                            ? "Today"
                            : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </p>

                    <Bookmark className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-700" />
                </div>

                {/* COMPANY */}
                <div className="flex items-center gap-3 mt-4">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>

                    <div>
                        <h3 className="text-sm font-semibold">
                            {job?.company?.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {job?.location}
                        </p>
                    </div>
                </div>

                {/* TITLE */}
                <h2 className="mt-4 font-bold text-base line-clamp-1">
                    {job?.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {job?.description}
                </p>

                {/* BADGES */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">
                        {job?.positions} Positions
                    </Badge>

                    <Badge variant="secondary">
                        {job?.jobType}
                    </Badge>

                    <Badge variant="secondary">
                        ₹ {job?.salary / 100000} LPA
                    </Badge>
                </div>
            </div>

            {/* ACTION BUTTON */}
            <Button
                onClick={() => navigate(`/description/${job?._id}`)}
                className="w-full mt-4"
            >
                View Details
            </Button>
        </div>
    );
};

export default Job;