import express from "express";
import userController  from "../../controllers/userController";
import paperGroupController from "../../controllers/paperGroupController";
let router = express.Router();

    
router.get("/me", userController.findOneStudent );

router.get("/paperGroup/:groupId", paperGroupController.findOnePaperGroup );

export default router;