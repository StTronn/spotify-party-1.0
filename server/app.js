/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";
import auth from "./routes/auth";
import User from "./models/user";
import Room from "./models/room";
import dotenv from "dotenv";
import mongoose from "mongoose";
import socketio from "socket.io";
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
dotenv.config();
console.log(process.env.CLIENT_ID + "");

const app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

let server = app.listen(8888);
var io = socketio.listen(server);

//socket
io.on("connect", (socket) => {
  socket.on("createRoom", async (user, callback) => {
    //check instead in session
    const findUser = await User.findOne({
      id: user.id,
    });
    if (findUser) {
      let findRoom = await Room.findOne({
        roomId: user.id,
      });
      if (!findRoom) {
        await new Room({
          roomId: user.id,
          users: [user],
        }).save();

        console.log("created room");
      }
      socket.emit("joinLink", { roomId: user.id });
    }
  });

  socket.on("join", async ({ user, roomId }, callback) => {
    const { username, id } = user;
    const name = username;
    const findUser = await User.findOne({
      id: id,
    });
    const findRoom = await Room.findOne({
      roomId,
    });

    if (findUser && findRoom) {
      console.log("hello room");
      socket.join(roomId);

      socket.emit("joinLink", { roomId });
      socket.emit("message", {
        user: "admin",
        text: `${name}, welcome to ${user.username}'s room .`,
      });
      socket.broadcast
        .to(roomId)
        .emit("message", { user: "admin", text: `${name} has joined!` });

      io.to(roomId).emit("roomData", {
        room: roomId,
        users: [],
      });
    } else callback({ ok: false, msg: "cannot find room" });
  });

  socket.on("sendMessage", ({ username, roomId, message }, callback) => {
    io.to(roomId).emit("message", { username, text: message });

    callback();
  });

  socket.on("sendPlaybackState", ({ newPlaybackObj, roomId }, callback) => {
    io.to(roomId).emit("playbackState", newPlaybackObj);

    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// ***connection with DB ***
const mongoConnectionURL =
  "mongodb+srv://rishav:rishav@cluster0-1zq8a.mongodb.net/spotify?retryWrites=true&w=majority";
// TODO change database name to the name you chose
const databaseName = "spotify";
mongoose
  .connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

app.use("", auth);

console.log("Listening on 8888");
