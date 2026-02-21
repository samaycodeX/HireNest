import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { decodeIdToken, generateCodeVerifier, generateState } from "arctic"
import { google } from "../utils/google.js";
import { createResetPasswordLink, createUserWithOauth, createVerifyEmailLink, generateRandomToken, getHtmlFromMjmlTemplate, getResetPasswordToken, getUserWithOauthId, linkUserWithOauth } from "../utils/authServices.js";
import { VerifyEmailToken } from "../models/verifyEmailToken.model.js";
import { OauthAccount } from "../models/oauthAccount.model.js";
import ejs from "ejs"
import fs from "fs/promises"
import path from "path";
import mjml2html from "mjml"
// import { sendEmail } from "../lib/nodemailer.lib.js";
import { sendEmail } from "../lib/resend.mail.js";
import validator from "validator";
import { ResetPasswordToken } from "../models/resetPasswordToken.model.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password should be 6 character",
                success: false
            });
        }
        let profilePhotoUrl = "";

        if (req.files?.profilePhoto?.[0]) {
            const file = req.files.profilePhoto[0];
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url;
        }


        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            isValidEmail: false,
            profile: {
                profilePhoto: profilePhotoUrl
            }

        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });


        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }


        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: 24 * 60 * 60 * 1000
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            });

    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const resume = req.files?.resume?.[0];
        const profilePhoto = req.files?.profilePhoto?.[0];

        // cloudinary ayega idhar
        let cloudResponse;
        let profilePhotoCloudResponse;
        if (resume) {
            const fileUri = getDataUri(resume);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        if (profilePhoto) {
            const profilePhotoUri = getDataUri(profilePhoto);
            profilePhotoCloudResponse = await cloudinary.uploader.upload(profilePhotoUri.content);
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        if (profilePhotoCloudResponse) {
            user.profile.profilePhoto = profilePhotoCloudResponse.secure_url // save the cloudinary url
        }
        if (cloudResponse) {

            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = resume.originalname // Save the original file name
        }


        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { previousPassword, newPassword } = req.body;
        const userId = req.id;

        if (!previousPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(userId).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(previousPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};



export const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const resetPasswordLink = await createResetPasswordLink({ userId: user._id })

        const html = await getHtmlFromMjmlTemplate("reset-password-email", {
            name: user.fullname,
            link: resetPasswordLink,
        })

        await sendEmail({
            to: user.email,
            subject: "Reset Your Password - HireNest",
            html,
        });

        return res.status(200).json({
            success: true,
            message: "Reset password mail sent successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const resetPasswordToken = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            });
        }

        const passwordResetData = await getResetPasswordToken(token);

        if (!passwordResetData.success) {
            return res.status(400).json({
                success: false,
                message: passwordResetData.message
            });
        }

        const user = await User.findById(passwordResetData.tokenDoc.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        await ResetPasswordToken.deleteMany({ userId: user._id });

        return res.status(200).json({
            success: true,
            message: "Password reset successfully 🎉"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");
        return res.status(200).json({
            user,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getGoogleLoginPage = async (req, res) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = google.createAuthorizationURL(state, codeVerifier, [
        "openid",
        "profile",
        "email",
    ]);

    res.cookie("google_oauth_state", state, {
        httpOnly: true,
        secure: false, // true in production
        maxAge: 10 * 60 * 1000,
        sameSite: "lax",
    });

    res.cookie("google_code_verifier", codeVerifier, {
        httpOnly: true,
        secure: false,
        maxAge: 10 * 60 * 1000,
        sameSite: "lax",
    });

    res.redirect(url.toString());
};


export const getGoogleLoginCallback = async (req, res) => {
    try {
        const { code, state } = req.query;

        const storedState = req.cookies.google_oauth_state;
        const codeVerifier = req.cookies.google_code_verifier;

        if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
            return res.redirect("http://localhost:5173/login");
        }

        const tokens = await google.validateAuthorizationCode(code, codeVerifier);

        const claims = decodeIdToken(tokens.idToken());
        const { sub: googleUserId, name, email, picture } = claims;
        // console.log({ googleUserId, name, email, picture });

        let user = await User.findOne({ email });

        if (user) {
            const existingOauth = await OauthAccount.findOne({
                userId: user._id,
                provider: "google"
            });

            if (!existingOauth) {
                await linkUserWithOauth({
                    userId: user._id,
                    provider: "google",
                    providerAccountId: googleUserId
                });
            }

            user.isValidEmail = true;

            if (picture && !user.profile?.profilePhoto) {
                user.profile = user.profile || {};
                user.profile.profilePhoto = picture;
            }

            await user.save();

        } else {

            user = await createUserWithOauth({
                name,
                email,
                provider: "google",
                providerAccountId: googleUserId,
            });

            if (picture) {
                user.profile = user.profile || {};
                user.profile.profilePhoto = picture;
                await user.save();
            }
        }


        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
        });

        if (!user.role || !user.phoneNumber || !user.password) {
            return res.redirect("http://localhost:5173/completeProfile");
        }

        if (user.role === "recruiter") {
            return res.redirect("http://localhost:5173/admin/homeadmin");
        }


        return res.redirect("http://localhost:5173/");

    } catch (error) {
        console.log(error);
        return res.redirect("http://localhost:5173/login");
    }
};

export const completeProfile = async (req, res) => {
    try {
        const { role, phoneNumber, password } = req.body;

        if (!role || !phoneNumber || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.role = role;
        user.phoneNumber = phoneNumber; // now string
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            message: "Profile completed successfully",
            user,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getVerifyEmailPage = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId)
        // console.log(user);


        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        if (user.isEmailValid) {
            return res.status(400).json({
                message: "Email already verified",
                success: false,
            });
        }

        return res.status(200).json({
            email: user.email,
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
};

export const resendVerificationLink = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId)
        // console.log("resendVerificationLink : ", user);

        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        if (user.isEmailValid) {
            return res.status(400).json({
                message: "Email already verified",
                success: false,
            });
        }

        await VerifyEmailToken.deleteMany({ userId: user._id });

        const randomToken = generateRandomToken(4);

        await VerifyEmailToken.create({
            userId: user._id,
            token: randomToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        const verifyEmailLink = await createVerifyEmailLink({
            email: user.email,
            token: randomToken,
        });

        const mjmlTemplate = await fs.readFile(path.join(
            import.meta.dirname,
            "..",
            "emails",
            "verify.email.mjml"
        ), "utf-8");

        const renderedTemplate = ejs.render(mjmlTemplate, {
            code: randomToken,
            link: verifyEmailLink
        });

        const { html } = mjml2html(renderedTemplate);

        await sendEmail({
            to: user.email,
            subject: "Verify your email - HireNest",
            html,
        });

        return res.status(200).json({
            message: "Verification mail sent successfully",
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
};

export const verifyEmailToken = async (req, res) => {
    try {
        const { token, email } = req.query;

        if (!token || token.length !== 4 || !email) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification request"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.isValidEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already verified"
            });
        }

        const tokenDoc = await VerifyEmailToken.findOne({
            userId: user._id,
            token
        });

        if (!tokenDoc) {
            return res.status(400).json({
                success: false,
                message: "Incorrect or expired verification code"
            });
        }

        if (tokenDoc.expiresAt < new Date()) {
            await VerifyEmailToken.deleteMany({ userId: user._id });
            return res.status(400).json({
                success: false,
                message: "Verification code expired"
            });
        }

        user.isValidEmail = true;
        await user.save();

        await VerifyEmailToken.deleteMany({ userId: user._id });

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




