import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  getUsersList,
  getUsersMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users-list", authenticate, getUsersList);
router.get("/:id", authenticate, getUsersMessages);
router.post("/send/:id", authenticate, sendMessage);

export default router;
