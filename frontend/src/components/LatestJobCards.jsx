import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="bg-white border rounded-xl shadow-sm p-5 w-full max-w-sm h-[220px] flex flex-col justify-between cursor-pointer hover:shadow-md transition"
        >
            {/* TOP */}
            <div>
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>

                    <div>
                        <h1 className="font-semibold text-sm">
                            {job?.company?.name}
                        </h1>
                        <p className="text-xs text-gray-500">
                            {job?.location}
                        </p>
                    </div>
                </div>

                {/* TITLE */}
                <h2 className="font-bold text-base mt-4 line-clamp-1">
                    {job?.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {job?.description}
                </p>
            </div>

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
    );
};

export default LatestJobCards;