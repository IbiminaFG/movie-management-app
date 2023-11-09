import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { email, name, image } = await req.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(id, { email, name });
    return NextResponse.json(
      { message: "Updated Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
