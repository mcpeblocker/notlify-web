import mongoose from "mongoose";

const accessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  botId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Bot",
  },
  domain: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const AccessModel = mongoose.model("Access", accessSchema);
