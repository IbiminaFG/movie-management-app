import { connectMongoDB } from "@/lib/mongodb";
import Account from "@/models/account";
import { NextResponse } from "next/server";

// Get by Id
export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connectMongoDB();

    const account = await Account.find({ _id: id });

    return new NextResponse(JSON.stringify(account), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to fetch the profile", { status: 500 });
  }
};

// Edit
export const PUT = async (request, { params }) => {
  console.log("first");
  const { image, name, address, gender, origin, phone } = await request.json();
  const { id } = params;

  //   const userId = request.nextUrl.searchParams.get("id");
  try {
    await connectMongoDB();
    console.log("i am here");

    // Find the existing prompt by ID
    const existingProfile = await Account.findByIdAndUpdate(id);
    console.log(existingProfile);

    //   const account = await Account.find({ _id: id });

    if (!existingProfile) {
      return new NextResponse("Account not found", { status: 404 });
    }

    if (name) {
      existingProfile.name = name;
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

    return new NextResponse("Successfully updated the Profile", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error Updating Profile", { status: 500 });
  }
};

// Delete
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();

    if (!id) {
      return new NextResponse.json({
        success: false,
        message: "Account ID is mandatory",
      });
    }

    const deleteAccount = await Account.findByIdAndDelete(id);

    if (deleteAccount) {
      return new NextResponse({
        success: true,
        message: "Account deleted successfully",
      });
    } else {
      return new NextResponse({
        success: false,
        message: "Something Went wrong",
      });
    }
  } catch (e) {
    console.log(e);
    return new NextResponse({
      success: false,
      message: "Something Went wrong",
    });
  }
}
