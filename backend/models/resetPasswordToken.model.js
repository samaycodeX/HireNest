import mongoose  from "mongoose";

const resetPasswordTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  tokenHash: {
    type: String,
    required: true,
  },

  expiresAt: {
    type: Date,
    required: true,
    default: () => Date.now() + 24 * 60 * 60 * 1000 // 1 day
  }

}, {
  timestamps: true
});

export const ResetPasswordToken = mongoose.model(
  "ResetPasswordToken",
  resetPasswordTokenSchema
);
