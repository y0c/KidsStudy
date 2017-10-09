import paperGroupController from "../../controllers/paperGroupController";
import express from "express";

let router = express.Router();

router.get("/", paperGroupController.findAllPaperGroup );

router.get("/:groupId", paperGroupController.findOnePaperGroup );

router.post("/", paperGroupController.createPaperGroup );

router.put("/:groupId", paperGroupController.updatePaperGroup );

router.delete("/:groupId", paperGroupController.destroyPaperGroup );

export default router;