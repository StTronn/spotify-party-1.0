import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema({
  link: String,
  users: [Schema.Types.Mixed],
});

export default mongoose.model("room", RoomSchema);
