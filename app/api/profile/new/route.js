import Profile from "@/models/profile";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectMongoDB();

    const profile = await Profile.find({}).populate("creator");

    return new Response(JSON.stringify(profile), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const POST = async (request) => {
  const { image, address, gender, phone, origin, userId } =
    await request.json();

  try {
    await connectMongoDB();

    const existingProfile = await Profile.findOne({
      creator: userId,
    }).populate("creator");

    if (existingProfile) {
      return NextResponse.json(
        { message: "User already has profile" },
        { status: 404 }
      );
    }

    await Profile.create({
      creator: userId,
      image,
      address,
      gender,
      phone,
      origin,
    });

    return NextResponse.json(
      { message: "Users Profile registered." },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while registering the users profile." },
      { status: 500 }
    );
  }
};
