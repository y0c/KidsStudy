import db from "../../models/index";
import { assert } from "chai";

describe( "UserPaperLog Model Test", () => {

    before(() => {
        return db.sequelize.sync({ force : true });
    });

    it("#Insert UserPaperLog", done => {
        
        db.User.create({
            userId : "holnet1026",
            userName : "임호성",
            role : "admin",
            etc : "비고",
            grade : "초1",
            password : "test11"
        }).then( user => {
            assert.isNotNull(user, "User is Null!!");
            return db.PaperGroup.create({
                groupId : "A",
                groupTitle : "초등 수학"
            });
        }).then( paperGroup => {
            assert.isNotNull(paperGroup, "PaperGroup is Null!");
            return db.Paper.bulkCreate([
                {
                    groupId : paperGroup.get("groupId"),
                    step : "110",
                    paperTitle : "뺄셈(0)",
                    description : "뺄셈을 하세요"
                },
                {
                    groupId : paperGroup.get("groupId"),
                    step : "111",
                    paperTitle : "뺄셈(1)",
                    description : "뺄셈을 하세요"
                },
                {
                    groupId : paperGroup.get("groupId"),
                    step : "112",
                    paperTitle : "뺄셈(2)",
                    description : "뺄셈을 하세요"
                }
            ]);
         }).then( () => {
            // assert.isNumber(paper.get("paperId"),"paper id is Null");
            return db.UserPaperLog.bulkCreate([
                {
                    userId : "holnet1026",
                    paperId : 1,
                    score : 90,
                    raiting : 'A',
                    solvingTime : "2:30"
                },
                {
                    userId : "holnet1026",
                    paperId : 1,
                    score : 80,
                    raiting : 'A',
                    solvingTime : "2:00"
                },
                {
                    userId : "holnet1026",
                    paperId : 1,
                    score : 70,
                    raiting : 'A',
                    solvingTime : "3:30"
                }

        ]);
         }).then( userPaperLog => {
             assert.isNotNull(userPaperLog);
             done();
         }).catch( err => {
             done(err);
         });
    });


    it("#Select UserPaperGroup with StudyPercent", done => {
        // console.log(db.sequelize);
        db.sequelize.query(
                `SELECT A.GROUP_ID,
                        A.GROUP_TITLE,
                        (
                            SELECT  round( CAST(COUNT(C.PAPER_ID) as double ) / COUNT(B.PAPER_ID) * 100, 0)
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
                        ) AS STUDY_PERCENT
                FROM PAPER_GROUP A`
            ,{ 
                bind : { userId : 'holnet1026' },
                type : db.sequelize.QueryTypes.SELECT 
            }
        ).then( groups => {
            assert.isArray(groups, "query fail");
            done();
        })
        
    });



});