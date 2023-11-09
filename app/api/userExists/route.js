import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req) {
  try {
    await connectMongoDB();
    const users = await User.find().populate("_id");
    return NextResponse.json({ users });
  } catch (error) {
    console.log(error);
  }
}
