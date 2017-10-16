import express from 'express';
import loginController from "../../controllers/loginController";
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('admin', { title: 'KidsStudyAdmin' });
});

router.get("/login", loginController.login );

router.get("/auth", loginController.auth );

export default router;
