import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        profilePhoto: user?.profile?.profilePhoto || "",
        resume: null, 
    });

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const resumeChangeHandler = (e) => {
        setInput({ ...input, resume: e.target.files?.[0] });
    };
    const profilePhotoChangeHandler = (e) => {
        setInput({ ...input, profilePhoto: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (input.resume) {
            formData.append("resume", input.resume);
        }

        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }
        
        try {
            setLoading(true);
            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                { withCredentials: true }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Name</Label>
                            <Input
                                name="fullname"
                                value={input.fullname}
                                onChange={changeHandler}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeHandler}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Number</Label>
                            <Input
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeHandler}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Bio</Label>
                            <Input
                                name="bio"
                                value={input.bio}
                                onChange={changeHandler}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Skills</Label>
                            <Input
                                name="skills"
                                value={input.skills}
                                onChange={changeHandler}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Resume</Label>
                            <Input
                                type="file"
                                accept="application/pdf"
                                onChange={resumeChangeHandler}
                                className="col-span-3"
                            />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Profile Photo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={profilePhotoChangeHandler}
                                className="col-span-3"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full my-4" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
