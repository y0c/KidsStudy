import db from "../models/index";

const User = db.User;


export default {
    login( req, res, next ){
        User.findOne({
            where : {
                userId : req.body.userId
            }
        }).then( user => {
                if( !user ){
                    res.send({
                        code : "success",
                        message : "존재하지 않는 아이디입니다."
                    });
                } else {
                    
                    if( user.get("password") != req.body.password ){
                        res.send({
                           code : "success",
                           message : "비밀번호가 일치하지 않습니다." 
                        });
                    } else {
                        req.session.user = user;
                        res.send({
                            code : "success",
                            message : `${user.get("userName")} 님 환영합니다.`,
                            user
                        });
                    }
                }
            }) ;       
    },

    auth( req, res, next ) {
        let userInfo = req.session.user;
        if( !userInfo ){
            res.status(401).send({
                code : "fail",
                message : "인증되지 않은 사용자입니다."     
            });
        } else {
            res.status(200).send({
                code : "success",
                userInfo
            });
        }
    }
}