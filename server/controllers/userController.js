import db from "../models/index";

let User = db.User;
let UserPaperLog = db.UserPaperLog;

export default { 
    
    findAllStudent( req, res, next ){
        User.findAll()
            .then( studentList => {
                res.send({
                    code : "success",
                    studentList
                })
            });
    },

    findOneStudent( req, res, next ){
        User.findOne({
            where : {
                userId : req.params.userId
            }
        }).then( student => {
            db.sequelize.query(
                    `SELECT A.GROUP_ID as groupId,
                            A.GROUP_TITLE as groupTitle,
                            (
                                SELECT  
                                    round( 
                                        CAST(COUNT(C.PAPER_ID) as double ) /
                                        COUNT(B.PAPER_ID) * 100,
                                    2)
                                FROM PAPER B LEFT JOIN 
                                            ( 
                                                SELECT USER_ID,
                                                    PAPER_ID
                                                FROM USER_PAPER_LOG
                                                WHERE USER_ID  = $userId
                                                GROUP BY USER_ID, PAPER_ID 
                                            ) C	
                                ON     B.PAPER_ID  = C.PAPER_ID
                                WHERE  B.GROUP_ID  = A.GROUP_ID
                            ) AS studyPercent
                    FROM PAPER_GROUP A`
                ,{ 
                    bind : { userId : req.params.userId },
                    type : db.sequelize.QueryTypes.SELECT 
                }
            ).then( paperGroupList => {
                res.send({
                    code : "success",
                    student,
                    paperGroupList
                });
            });
        });
    },
    

    findUserPaperLog( req, res, next ){
        UserPaperLog.findAll({
            where : {
                userId : req.params.userId
            }
        }).then( userPaperLogList => {
            res.send({
                code : "success",
                userPaperLogList
            });
        });
    },

    createStudent( req, res, next ){
        User.create(req.body)
            .then( studnet => {
                res.send({
                    code : "success"
                });
            });
    },

    updateStudent( req, res, next ){
        User.update( req.body, {
            where : {
                userId : req.params.userId
            }
        }).then( ( count, row ) => {
            res.send({
                code : "success",
            });
        });
    },

    destroyStudent( req, res, next ){
        User.destroy({
            where : {
                userId : req.params.userId
            }
        }).then( count => {
            res.send({
                code : "success"
            });
        });
    }
}