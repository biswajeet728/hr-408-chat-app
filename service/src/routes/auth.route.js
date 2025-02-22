import express from "express";
import { create, login, logout, me } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/new", create);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticate, me);

export default router;
