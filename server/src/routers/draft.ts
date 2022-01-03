import express from "express";
import { AddDraft, GetDrafts, RemoveDraft } from "../controllers/draft";

const router = express.Router();

router.post("/add", AddDraft);
router.post("/remove", RemoveDraft);
router.get("/all", GetDrafts);

export default router;
