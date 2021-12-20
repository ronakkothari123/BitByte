import express from "express";
import {
    DeleteUser,
    GetAllUsers,
    GetOne,
    Login,
    Me,
    Register,
} from "../controllers/user";

const router = express.Router();

router.get("/me", Me);
router.get("/", GetAllUsers);
router.get("/:id", GetOne);
router.post("/register", Register);
router.post("/login", Login);
router.post("/delete", DeleteUser);

export default router;
