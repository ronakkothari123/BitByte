import express from "express";
import { AddDraft, GetDrafts } from "../controllers/draft";

const router = express.Router();

router.post("/add", AddDraft);
router.get("/all", GetDrafts);

export default router;
