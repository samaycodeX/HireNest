import mongoose from "mongoose";

const oauthAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: String,
      enum: ["google", "github", "facebook"],
      required: true,
    },

    providerAccountId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);



export const OauthAccount = mongoose.model("OauthAccount", oauthAccountSchema);
