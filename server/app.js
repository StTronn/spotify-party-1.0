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
import cookieParser from "cookie-parser";
import auth from "./routes/auth";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import socketio from "socket.io";
dotenv.config();
console.log(process.env.CLIENT_ID + "");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//socket
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
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

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.use("", auth);

console.log("Listening on 8888");
app.listen(8888);
