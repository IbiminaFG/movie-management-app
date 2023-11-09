import { connectMongoDB } from "@/lib/mongodb";
import Profile from "@/models/profile";
import { NextResponse } from "next/server";
import User from "@/models/user";

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

    await Profile.deleteMany({ creator: id });
    const deleteAccount = await User.findByIdAndDelete(id);

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
