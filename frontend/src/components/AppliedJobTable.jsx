import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-hidden rounded-2xl">
      <Table>
        <TableCaption className="text-sm text-gray-500 py-4">
          A list of your applied jobs
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700">
              Date
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Job Role
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Company
            </TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-12 text-center text-gray-500"
              >
                You haven't applied any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="transition hover:bg-fuchsia-50/40"
              >
                <TableCell className="text-sm text-gray-600">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="font-medium text-gray-900">
                  {appliedJob.job?.title}
                </TableCell>

                <TableCell className="text-gray-700">
                  {appliedJob.job?.company?.name}
                </TableCell>

                <TableCell className="text-right">
                  <Badge
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      appliedJob?.status === "rejected"
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : appliedJob.status === "pending"
                        ? "bg-gray-100 text-gray-700 border border-gray-200"
                        : "bg-green-100 text-green-700 border border-green-200"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
