import express from 'express';
let router = express.Router();


export default ( db ) => {
    router.get('/', (req, res, next) => {
        db.users.find({}, (err, docs) => {
            res.send({
                code : "success",
                docs
            });
        });
    });

    router.post("/", (req, res, next ) => {
        let user = {
            userid : req.body.userid,
            username : req.body.username,
            password : req.body.password,
            createdAt : new Date(),
            modifiedAt : new Date(),
            etc : req.body.etc
        };

        db.users.insert( user, ( err, newUser ) => {
            if( err ){
                throw new Error(["학생계정 생성중 오류 발생"]);
            }

            res.status(200);
            res.send({
                code : "success",
                message : newUser.username + " 학생계정이 등록되었습니다",
                newUser
            });

        });
    });

    router.put("/", ( req, res, next ) => {
        let modifyUser = {
            username : req.body.username,
            password : req.body.password,
            modifiedAt : new Date(),
            etc : req.body.etc
        };

        db.users.update({ userid : req.body.userid }, { $set : modifyUser}, {},  ( err, numUpdated ) => {
            if( err ){
                throw new Error(["학생계정 수정중 오류 발생"]);
            }

            res.status(200);
            res.send({
                code : "success",
                message :  "학생 정보가 수정되었습니다",
            });
        });
    });


    router.delete("/:userid",( req, res, next ) => {
        db.users.remove({ userid : req.params.userid }, {}, ( err ) => {
            if( err ){
                throw new Error(["학생계정 수정중 오류 발생"]);
            }

            res.status(200);
            res.send({
                code : "success",
                message : "학생 정보가 삭제되었습니다"
            });

        });
    });

    return router;
};
