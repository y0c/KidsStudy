import express from 'express';
const router = express.Router();



export default ( db ) => {
    /* GET home page. */
    router.get('/', (req, res, next) => {
        res.render('student', {
            title: 'Express'
        });
    });

    router.post("/login", (req, res, next) => {
        db.users.find({ userid : req.body.userid }, ( err, docs ) => {

            if( !docs.length ){
                res.send({
                    code : "fail",
                    message : "입력하신 아이디를 확인해보세요"
                });
            } else {
                let user = docs[0];
                if( req.body.password == user.password ){
                    req.session.user = user;
                    res.send({
                        code : "success",
                        message : user.username + "님 환영합니다.",
                        user : user
                    });
                } else {
                    res.send({
                        code : "fail",
                        message : "비밀번호가 일치하지 않습니다!"
                    });
                }
            }


        });
    });

    router.post("/auth", (req, res, next) => {
        if( req.session.user ){
            res.status(200);
            res.send({
                code : "success",
                user : req.session.user
            });
        } else {
            res.status(401);
            res.send({
                code : "fail",
                message : "인증되지 않은 유저입니다."
            })
        }
    });
    return router;
}
