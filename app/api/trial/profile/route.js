import { connectMongoDB } from "@/lib/mongodb";
import Account from "@/models/account";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const account = await Account.findOne({ email }).select("_id");
    console.log("account: ", account);
    return NextResponse.json({ account });
  } catch (error) {
    console.log(error);
  }
}

// Get
export async function GET(req) {
  try {
    await connectMongoDB();
    const accounts = await Account.find();
    return NextResponse.json({ accounts });
  } catch (error) {
    console.log(error);
  }
}
