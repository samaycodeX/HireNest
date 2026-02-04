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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow
              key={company._id}
              className="transition hover:bg-fuchsia-50"
            >
              <TableCell>
                <Avatar className="h-10 w-10 ring-1 ring-gray-200">
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>

              <TableCell className="font-medium">
                {company.name}
              </TableCell>

              <TableCell className="text-sm text-gray-500">
                {company.createdAt.split("T")[0]}
              </TableCell>

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

                  <PopoverContent className="w-36 rounded-xl">
                    <button
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
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
                      Edit
                    </button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
