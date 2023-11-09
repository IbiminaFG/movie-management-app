import { connectMongoDB } from "@/lib/mongodb";
import Profile from "@/models/profile";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connectMongoDB();

    const profiles = await Profile.find({ _id: id }).populate("creator");

    return new NextResponse(JSON.stringify(profiles), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to fetch the profile", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { image, name, address, gender, origin, phone } = await request.json();
  const { id } = params;

  const userId = request.nextUrl.searchParams.get("id");
  try {
    await connectMongoDB();

    // Find the existing prompt by ID
    const existingProfile = await Profile.findByIdAndUpdate(id).populate(
      "creator"
    );

    const user = await User.find({ _id: userId });
    console.log(user);

    if (user && name) {
      user[0].name = name;
    }

    if (!existingProfile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    // Update the prompt with new data
    if (image) {
      existingProfile.image = image;
    }

    if (name) {
    }

    if (address) {
      existingProfile.address = address;
    }
    if (gender) {
      existingProfile.gender = gender;
    }
    if (phone) {
      existingProfile.phone = phone;
    }
    if (origin) {
      existingProfile.origin = origin;
    }

    await existingProfile.save();
    await user[0].save();

    return new NextResponse("Successfully updated the Profile", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error Updating Profile", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    console.log("params.id", params.id);
    await Profile.findByIdAndDelete(params.id);

    return new Response("Profile deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error deleting profile", { status: 500 });
  }
};
