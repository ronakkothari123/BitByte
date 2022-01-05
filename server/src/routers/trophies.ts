import express from "express";
import { AddTrophy } from "../controllers/trophies";

const router = express.Router();

router.post("/add", AddTrophy);

export default router;
