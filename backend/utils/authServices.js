import path from "path";
import { OauthAccount } from "../models/oauthAccount.model.js";
import { ResetPasswordToken } from "../models/resetPasswordToken.model.js";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import fs from "fs/promises";
import ejs from "ejs";
import mjml2html from "mjml";

export const getUserWithOauthId = async ({ email, provider }) => {
  const user = await User.findOne({ email });

  if (!user) return null;

  const oauthAccount = await OauthAccount.findOne({
    userId: user._id,
    provider,
  });

  user.isValidEmail = true;
  await user.save()

  if (!oauthAccount) return null;

  return user;   // RETURN REAL USER
};



export const linkUserWithOauth = async ({
  userId,
  provider,
  providerAccountId,
}) => {
  await OauthAccount.create({
    userId,
    provider,
    providerAccountId,
  });
};

export const createUserWithOauth = async ({
  name,
  email,
  provider,
  providerAccountId,
}) => {
  const user = await User.create({
    fullname: name,   // FIXED
    email,
    isValidEmail: true
  });

  await OauthAccount.create({
    userId: user._id,
    provider,
    providerAccountId,
  });

  return user;
};

export const generateRandomToken = (digit = 4) => {
  const min = 10 ** (digit - 1);
  const max = 10 ** digit;

  return crypto.randomInt(min, max).toString();
};

export const createVerifyEmailLink = ({ email, token }) => {
  const uriEncodeEmail = encodeURIComponent(email);
  return `${process.env.FRONTEND_URL}/verify-email-token?token=${token}&email=${uriEncodeEmail}`
}

export const createResetPasswordLink = async ({ userId }) => {
  const randomToken = crypto.randomBytes(32).toString("hex")

  const tokenHash = crypto.createHash("sha256").update(randomToken).digest("hex")

  await ResetPasswordToken.deleteMany({ userId });

  await ResetPasswordToken.create({
    userId,
    tokenHash,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return `${process.env.FRONTEND_URL}/reset-password/${tokenHash}`
}

export const getHtmlFromMjmlTemplate = async (template, data) => {
  const mjmlTemplate = await fs.readFile(path.join(
    import.meta.dirname,
    "..",
    "emails",
    `${template}.mjml`
  ), "utf-8");

  const renderedTemplate = ejs.render(mjmlTemplate, data);

  return mjml2html(renderedTemplate).html
}

export const getResetPasswordToken = async (token) => {
  // const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  // console.log(tokenHash);
  
  const tokenDoc = await ResetPasswordToken.findOne( {tokenHash : token} );


  if (!tokenDoc) {
    return { success: false, message: "Invalid or expired reset link" };
  }

  if (tokenDoc.expiresAt < new Date()) {
    await ResetPasswordToken.deleteMany({ tokenHash });
    return { success: false, message: "Reset password link expired" };
  }

  return { success: true, tokenDoc };
};