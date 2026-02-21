import express from "express";
import { completeProfile, getCurrentUser, getGoogleLoginCallback, getGoogleLoginPage, getVerifyEmailPage, login, logout, register, resendVerificationLink, resetPassword, resetPasswordToken, updatePassword, updateProfile, verifyEmailToken } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { uploadFiles } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(uploadFiles,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,uploadFiles,updateProfile);
router.route("/profile/update-password").post(isAuthenticated, updatePassword)
router.route("/profile/reset-password").post(resetPassword)
router.route("/profile/reset-password/:token").post(resetPasswordToken)
router.route("/google").get(getGoogleLoginPage)
router.route("/google/callback").get(getGoogleLoginCallback)
router.post("/complete-profile", isAuthenticated, completeProfile);
router.get("/me", isAuthenticated, getCurrentUser);
router.get("/verify-email", isAuthenticated,getVerifyEmailPage)
router.route("/resend-verification-link").get(isAuthenticated, resendVerificationLink)
router.route("/verify-email-token").get(verifyEmailToken)
export default router;