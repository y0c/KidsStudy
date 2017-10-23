import db from "../models/index";

let User = db.User;
let UserPaperLog = db.UserPaperLog;

export default { 
    
    findAllStudent( req, res, next ){
        User.findAll({
            where : {
                role : "student"
            }
        })
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
            console.log(student.get("userId"));
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
                    bind : { userId : student.get("userId") },
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
                    code : "success",
                    message : "학생이 등록되었습니다."
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
                message : "학생정보가 수정되었습니다." //TODO : pretty
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
                code : "success",
                message : "학생정보가 삭제되었습니다."
            });
        });
    }
}