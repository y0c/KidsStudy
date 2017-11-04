import express from 'express';
const router = express.Router();



export default ( db ) => {
    /* GET home page. */
    router.get('/', (req, res, next) => {
        res.render('student', {
            title: 'Express'
        });
    });

    return router;
}
