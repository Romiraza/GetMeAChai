import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
    },

    coverPic: {
      type: String,
    },

    safepayid: { 
      type: String 
    },
    safepaysecret: { 
      type: String 
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  }
);

export default models.User || model("User", userSchema);