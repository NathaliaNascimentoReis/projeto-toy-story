import express from "express";
import {
  getAll,
  getByID,
  create,
  deletar
} from "../controllers/personagensController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getByID);
router.post("/", create);
router.delete("/:id", deletar);

export default router;
