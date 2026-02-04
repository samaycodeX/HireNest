import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(
        (store) => store.job
    );

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title
                    ?.toLowerCase()
                    .includes(searchJobByText.toLowerCase()) ||
                job?.company?.name
                    ?.toLowerCase()
                    .includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="overflow-hidden rounded-2xl">
            <Table>
                {/* CAPTION */}
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-700">
                            Company
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                            Role
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                            Posted On
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="py-12 text-center text-gray-500"
                            >
                                No jobs found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs.map((job) => (
                            <TableRow
                                key={job._id}
                                className="
                  transition
                  hover:bg-fuchsia-50/40
                "
                            >
                                {/* COMPANY */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 ring-1 ring-gray-200">
                                            <AvatarImage
                                                src={job?.company?.logo}
                                                alt={job?.company?.name}
                                            />
                                        </Avatar>
                                        <span className="font-medium text-gray-900">
                                            {job?.company?.name}
                                        </span>
                                    </div>
                                </TableCell>

                                {/* ROLE */}
                                <TableCell className="text-gray-800">
                                    {job?.title}
                                </TableCell>

                                {/* DATE */}
                                <TableCell className="text-sm text-gray-500">
                                    {job?.createdAt?.split("T")[0]}
                                </TableCell>

                                {/* ACTION */}
                                <TableCell
                                    className="text-right"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-2 rounded-full hover:bg-gray-200">
                                                <MoreHorizontal />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-40 rounded-xl"> 
                                            <button
                                                onClick={() =>
                                                    navigate(`/admin/jobupdate/${job._id}`)
                                                }
                                                className="
                          w-full flex items-center gap-2
                          px-3 py-2 text-sm
                          rounded-lg
                          hover:bg-gradient-to-r
                          hover:from-fuchsia-500
                          hover:to-fuchsia-700
                          hover:text-white
                        "
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                Edit Job
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/jobs/${job._id}/applicants`
                                                    )
                                                }
                                                className="
                          w-full flex items-center gap-2
                          px-3 py-2 text-sm mt-1
                          rounded-lg
                          hover:bg-gradient-to-r
                          hover:from-fuchsia-500
                          hover:to-fuchsia-700
                          hover:text-white
                        "
                                            >
                                                <Eye className="h-4 w-4" />
                                                Applicants
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
