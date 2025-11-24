import express from "express";
import getTodos from "../controller/getTodos.js";

const router = express.Router();

// Define your routes here
router.get("/", getTodos);

export default router;
