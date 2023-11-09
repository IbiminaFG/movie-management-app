import mongoose, { Schema, models } from "mongoose";

const accountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
    },
    origin: {
      type: String,
    },
  },
  { timestamps: true }
);

const Account = models.Account || mongoose.model("Account", accountSchema);
export default Account;
