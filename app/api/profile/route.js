import { connectMongoDB } from "@/lib/mongodb";
import Profile from "@/models/profile";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectMongoDB();

    const profiles = await Profile.find({}).populate("creator");

    return new NextResponse(JSON.stringify(profiles), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch all profiles", { status: 500 });
  }
};
