import express from "express";
import {
  getAll,
  getByID,
  create,
} from "../controllers/personagensController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getByID);
router.post("/", create);

export default router;
