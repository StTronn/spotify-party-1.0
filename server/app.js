/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

import express from "express"; // Express web server framework
import cors from "cors"; // "Request" library
import cookieParser from "cookie-parser"; // "Request" library
import auth from "./routes/auth"; // "Request" library
import dotenv from "dotenv"; // "Request" library
dotenv.config();

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.use("", auth);

console.log("Listening on 8888");
app.listen(8888);
