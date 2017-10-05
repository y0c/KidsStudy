import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('admin', { title: 'Express' });
});

router.get("/test", (req, res, next) => {
    res.render("test");
})

export default router;
