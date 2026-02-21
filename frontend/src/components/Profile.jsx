import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { AlertCircle, CheckCircle, CheckCircle2, Contact, Mail, Pen, SendHorizonal } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { Link, useNavigate } from "react-router-dom";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";

const Profile = () => {
  useGetAppliedJobs();
  useGetCurrentUser();
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      {/* PROFILE CARD */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                className="object-cover"
                src={
                  user?.profile?.profilePhoto ||
                  "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                }
                alt="profile"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 text-sm">{user?.profile?.bio || "No bio added yet"}</p>
            </div>
          </div>

          <Button
            onClick={() => navigate("/update-profile")}
            variant="outline"
          >
            <Pen />
          </Button>

        </div>

        {/* CONTACT */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <div>
              {user?.email}
            </div>
            <div>
              {user?.isValidEmail ? (
                <div className="flex gap-1 text-sm bg-green-100 justify-between text-green-900 items-center px-2 py-1 rounded-2xl"><CheckCircle2 size={16} /> Verified Email</div>
              ) : (
                <div className="flex gap-1 text-sm bg-gray-100 justify-between items-center px-2 py-1 rounded-2xl"> <AlertCircle size={16} />Not Verified</div>
              )}
            </div>
            {
              !user?.isValidEmail && <Link
                to="/verify-email"

                className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1 shadow-sm px-3 py-1 rounded-md"
              >

                <SendHorizonal size={20} />
                Verify Now
              </Link>
            }
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* SKILLS */}
        <div className="my-5">
          <h1 className="mb-1">Skills</h1>
          <div className="flex items-center gap-1 flex-wrap">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        {/* RESUME */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={user.profile.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* APPLIED JOBS */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg text-center pt-2 my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

    </div>
  );
};

export default Profile;
