import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div
            className="
        w-full
        rounded-2xl
        bg-white/80
        backdrop-blur-xl
        border border-gray-200
        shadow-lg shadow-fuchsia-100/40
        p-5
      "
        >
            {/* HEADER */}
            <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                    Filter Jobs
                </h2>
                <p className="text-sm text-gray-500">
                    Refine your search results
                </p>
            </div>

            <div className="border-t border-gray-200 mb-5"></div>

            {/* FILTER OPTIONS */}
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
                {fitlerData.map((data, index) => (
                    <div key={index}>
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">
                            {data.fitlerType}
                        </h3>

                        <div className="space-y-2">
                            {data.array.map((item, idx) => {
                                const itemId = `filter-${index}-${idx}`;

                                return (
                                    <label
                                        key={itemId}
                                        htmlFor={itemId}
                                        className="
                      flex items-center gap-3
                      px-3 py-2
                      rounded-lg
                      cursor-pointer
                      transition-all duration-200
                      hover:bg-fuchsia-50
                    "
                                    >
                                        <RadioGroupItem
                                            value={item}
                                            id={itemId}
                                            className="
                        border-gray-300
                        text-fuchsia-600
                        focus:ring-fuchsia-500
                      "
                                        />
                                        <Label
                                            htmlFor={itemId}
                                            className="text-sm text-gray-700 cursor-pointer"
                                        >
                                            {item}
                                        </Label>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
