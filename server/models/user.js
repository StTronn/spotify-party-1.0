import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  href: String,
  access_token: String,
  refresh_token: String,
  playback: { type: Schema.Types.Mixed, default: {} },
});

export default mongoose.model("user", UserSchema);
