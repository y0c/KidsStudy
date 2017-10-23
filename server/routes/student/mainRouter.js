import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

export default ( db ) => {
    
    router.get("/:userId", userController.findOneStudent );


    return router;
}