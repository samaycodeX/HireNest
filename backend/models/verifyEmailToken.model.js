import mongoose  from "mongoose";

const verifyEmailTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  token: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4
  },

  expiresAt: {
    type: Date,
    required: true,
    default: () => Date.now() + 24 * 60 * 60 * 1000 // 1 day
  }

}, {
  timestamps: true
});

export const VerifyEmailToken = mongoose.model(
  "VerifyEmailToken",
  verifyEmailTokenSchema
);
