import mongoose, { Schema, model, models } from "mongoose";

const ApplicationSchema = new Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  clerkUserId: { type: String, required: true },
  applicantName: { type: String },
  applicantEmail: { type: String },
  appliedAt: { type: Date, default: Date.now },
});

export const Application =
  models.Application || model("Application", ApplicationSchema);
