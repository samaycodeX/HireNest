import mongoose from "mongoose";
import { OauthAccount } from "./oauthAccount.model.js";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isValidEmail: {
        type: Boolean,
        default: false,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String }, // URL to resume file
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: {
            type: String,
            default: ""
        }
    },
}, { timestamps: true });

userSchema.pre("findOneAndDelete", async function (next) {
    const user = await this.model.findOne(this.getFilter());
    await OauthAccount.deleteMany({ userId: user._id });
    next();
});

export const User = mongoose.model('User', userSchema);