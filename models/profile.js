import { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
});

const Profile = models.Profile || model("Profile", ProfileSchema);
export default Profile;
