import express from "express";
import { getAll, getByID } from "../controllers/personagensController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getByID)

export default router;
