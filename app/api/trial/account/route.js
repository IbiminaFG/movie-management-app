import { connectMongoDB } from "@/lib/mongodb";
import Account from "@/models/account";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();

    const accounts = await Account.find();
    console.log(accounts);

    const existingAccount = accounts.find(
      (account) => account?.email === email
    );

    if (existingAccount) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 409 }
      );
    }

    await Account.create({ name, email, password: hashedPassword });

    return NextResponse.json(
      { message: "Account registered." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the account." },
      { status: 500 }
    );
  }
}
