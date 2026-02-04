import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { Building2 } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-fuchsia-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* CARD */}
        <div
          className="
            bg-white
            rounded-2xl
            border border-gray-200
            shadow-xl shadow-fuchsia-200/40
            p-10
          "
        >
          {/* HEADER */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="
                h-14 w-14
                rounded-xl
                bg-gradient-to-r from-fuchsia-500 to-fuchsia-700
                flex items-center justify-center
                text-white
                shadow-lg shadow-fuchsia-500/30
              "
            >
              <Building2 size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Your Company Name
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                What would you like to give your company name? You can change
                this later.
              </p>
            </div>
          </div>

          {/* INPUT */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Company Name
            </Label>
            <Input
              type="text"
              placeholder="JobHunt, Microsoft etc."
              onChange={(e) => setCompanyName(e.target.value)}
              className="
                h-11
                border border-gray-200
                shadow-sm shadow-black/5
                focus-visible:ring-fuchsia-500
              "
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 mt-10">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>

            <Button
              onClick={registerNewCompany}
              className="
                bg-gradient-to-r from-fuchsia-500 to-fuchsia-700
                text-white
                shadow-lg shadow-fuchsia-500/30
                transition-all duration-300
                hover:scale-[1.03]
              "
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
