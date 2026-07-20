import { Google } from "arctic";

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
   "https://hirenest-4p93.onrender.com/api/v1/user/google/callback"
)
