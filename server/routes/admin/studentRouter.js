import userController from "../../controllers/userController";
import express from "express";

let router = express.Router();

router.get("/", userController.findAllStudent );

router.get("/:userId", userController.findOneStudent );

router.get("/paperLog/:userId", userController.findUserPaperLog );

router.post("/", userController.createStudent );

router.put("/:userId", userController.updateStudent );

router.delete("/:userId", userController.destroyStudent );

export default router;