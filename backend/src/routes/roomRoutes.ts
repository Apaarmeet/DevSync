import express from "express";
import { createRoom, joinRoom, saveCode } from "../controllers/roomController";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, createRoom);
router.post("/join/:roomId", verifyToken, joinRoom);
router.post("/savecode/:roomId", verifyToken, saveCode);

export default router;
