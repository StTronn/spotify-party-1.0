import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema({
  roomId: String,
  users: [Schema.Types.Mixed],
});

export default mongoose.model("room", RoomSchema);
