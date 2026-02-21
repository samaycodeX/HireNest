import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setFilters } from "@/redux/jobSlice";

const filterData = [
    {
        filterType: "Location",
        key: "location",
        array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
        filterType: "Industry",
        key: "industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
    },
    {
        filterType: "Salary",
        key: "salary",
        array: ["0-5", "5-10", "10-20"],
    },
];

const FilterCard = () => {
    const dispatch = useDispatch();
    const [filters, setLocalFilters] = useState({
        location: "",
        industry: "",
        salary: "",
    });

    const changeHandler = (key, value) => {
        const updatedFilters = { ...filters, [key]: value };
        setLocalFilters(updatedFilters);
        dispatch(setFilters(updatedFilters));
    };

    return (
        <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-5">Filter Jobs</h2>

            {filterData.map((section, index) => (
                <div key={index} className="mb-6">
                    <h3 className="text-sm font-medium mb-3">
                        {section.filterType}
                    </h3>

                    <RadioGroup
                        value={filters[section.key]}
                        onValueChange={(value) => changeHandler(section.key, value)}
                        className="space-y-2"
                    >
                        {section.array.map((item, idx) => {
                            const itemId = `${section.key}-${idx}`;

                            return (
                                <label
                                    key={itemId}
                                    htmlFor={itemId}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </label>
                            );
                        })}
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;