import { connectionDb } from "@/lib/db";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(connectionDb);
    const result = await User.find({});
    return NextResponse.json({ result, success: true });
}

export async function POST(request: NextRequest) {
    const payload = await request.json();
    await mongoose.connect(connectionDb);
    let userData = await new User(payload);
    const result = await userData.save();
    return NextResponse.json({ result, success: true });
}

export async function PUT(request: NextRequest) {
    const payload = await request.json();
    await mongoose.connect(connectionDb);
    const result = await User.findOneAndUpdate({ _id: payload._id }, payload);
    return NextResponse.json({ result, success: true });
}

export async function DELETE(request: NextRequest) {
    const payload = await request.json();
    await mongoose.connect(connectionDb);
    const result = await User.deleteOne({ _id: payload.id });
    return NextResponse.json({ result, success: true });
}