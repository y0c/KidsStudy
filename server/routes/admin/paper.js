import express from 'express';
let router = express.Router();


export default ( db ) => {
    router.get('/', (req, res, next) => {
        db.papers.find({}, (err, docs) => {
            res.send({
                code : "success",
                docs
            });
        });
    });


    router.get("/:paperid", (req, res, next) => {
        db.papers.findOne({ _id : req.params.paperid }, (err, doc) => {
            res.send({
                code : "success",
                doc
            });
        });
    });


    router.post("/", (req, res, next ) => {
        let paper = {
            title : req.body.title,
            questions : req.body.questions,
            createdAt : new Date(),
            modifiedAt : new Date(),
            etc : req.body.etc
        };

        db.papers.insert( paper, ( err, newPaper ) => {
            if( err ){
                throw new Error(["학습지 생성중 오류발생"]);
            }

            res.status(200);
            res.send({
                code : "success",
                message : newPaper.title + " 학습지가 등록되었습니다.",
                newPaper
            });

        });
    });

    router.put("/", ( req, res, next ) => {
        let modifyPaper = {
            title : req.body.title,
            questions : req.body.questions,
            modifiedAt : new Date(),
            etc : req.body.etc
        };

        db.papers.update({ _id : req.body._id }, { $set : modifyPaper}, {},  ( err, numUpdated ) => {
            if( err ){
                throw new Error(["학습지 수정중 오류 발생"]);
            }

            res.status(200);
            res.send({
                code : "success",
                message :  "학습지 정보가 수정되었습니다",
            });
        });
    });


    router.delete("/:paperid",( req, res, next ) => {
        db.papers.remove({ _id : req.params.paperid }, {}, ( err ) => {
            if( err ){
                throw new Error(["학습지 삭제중 오류 발생"]);
            }

            res.status(200);
            res.send({
                code : "success",
                message : "학습지 정보가 삭제되었습니다"
            });

        });
    });


    return router;
};
