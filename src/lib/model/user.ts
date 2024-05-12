import mongoose from "mongoose";

const userModal = new mongoose.Schema({
    fullname: String,
    address: String,
    profession: String,
    compensation: String,
});

export const User = mongoose.models.users || mongoose.model("users", userModal);
