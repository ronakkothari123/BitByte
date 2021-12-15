import express from "express";
import { GetAllUsers, GetOne, Register } from "../controllers/user";

const router = express.Router();

router.get("/", GetAllUsers);
router.get("/:id", GetOne);
router.post("/register", Register);

export default router;
