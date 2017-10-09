import paperController from "../../controllers/paperController"
import express from 'express';

let router = express.Router();

router.get("/:groupId", paperController.findAllPaper );

router.get("/:groupId/:paperId", paperController.findOnePaper );

router.put("/:paperId", paperController.updatePaper );

router.post("/", paperController.createPaper );

router.delete("/:paperId", paperController.destroyPaper );

export default router;