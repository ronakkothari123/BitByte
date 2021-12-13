import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
    res.send("User Page");
});

export default router;
