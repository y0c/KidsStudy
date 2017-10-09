import db from "../../models/index";
import { assert } from "chai";

describe( "Paper Model Test", () => {
    
    before(() => {
        return db.sequelize.sync({ force : true })
            .then(() => {
                return db.PaperGroup.create({
                    groupId : "F",
                    groupTitle : "Test!!!",
                    createdAt : new Date()
                }).then( (paperGroup) => {
                    return db.Paper.create({
                        groupId : paperGroup.getDataValue("groupId"),
                        step : "111",
                        description : "뺄셈을 하세요",
                        paperTitle : "뺄셈(0)",
                        createdAt : new Date()
                    });
                }). then( paper => {
                    let paperId = 1;
                    return db.PaperQuestion.bulkCreate([
                        { 
                            paperId,
                            question : "3333+4444+2222"
                        },
                        { 
                            paperId,
                            question : "3323+4444+2222"
                        },
                        { 
                            paperId,
                            question : "3+4444+2222"
                        },
                        { 
                            paperId,
                            question : "4+4444+2222"
                        },
                        { 
                            paperId,
                            question : "3333+5+2222"
                        }
                    ]);
                })
            });
    });


    it("#Select Paper List with Join PaperQuestion", done => {
        db.Paper.findOne({
            where : {
                paperId : 1
            }
        }).then( paper => {
            assert.isNotNull(paper, "paper is null!");
            return paper.getPaperQuestions()
                    .then( list => {
                        return {
                            paper,
                            questions : list 
                        }
                    });
        }).then( obj => {
            assert.isNotNull(obj.paper);
            assert.isArray(obj.questions);
            assert( obj.questions.length > 3);
            done();
        })
    });
});