import { Google } from "arctic";

const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI ||
    "https://hirenest-4p93.onrender.com/api/v1/user/google/callback";

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    googleRedirectUri
);
