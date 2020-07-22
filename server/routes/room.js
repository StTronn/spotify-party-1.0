import { Router } from "express"; // Express web server framework
import uuid from "uuid";
const router = Router();

import Room from "../models/room";

router.get("/create", async (req, res) => {
  const { _id, access_token } = req.body;
  const room = new Room({
    link: uuid(),
    users: [_id],
  });
});

router.get("/:roomId", async (req, res) => {
  const { _id, access_token } = req.body;
});
export default router;
