import express from "express";
import {
  getAll,
  getByID,
  create,
  deletar,
  update,
  tipoFiltro
} from "../controllers/personagensController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getByID);
router.post("/", create);
router.delete("/:id", deletar);
router.put("/:id", update);
router.get("/filtros", tipoFiltro);

export default router;
