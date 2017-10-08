import db from "../../models/index";
import { assert } from "chai";

describe( "PaperQuestion Model Test", () => {

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
                })
            });
    });

    it( "#Insert PaperQuestion", ( done ) => {
        db.Paper.max("paperId").then( ( paperId ) => {
            assert.isNotNull(paperId);
            return db.PaperQuestion.create({
                paperId,
                question : "4+3+3+2"
            });
        }).then( (paperQuestion) => {
            assert.isDefined(paperQuestion);
            done();
        }).catch( (err) => {
            done(err);
        });
    });

    it("#Bulk Insert PaperQuestion", ( done ) => {
        db.Paper.max("paperId").then( ( paperId ) => {
            assert.isNumber(paperId, "paperId is Number");
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
        }).then(() => {
            return db.PaperQuestion.findAll();
        }).then( list => {
            assert.isArray(list);
            assert( list.length > 4 );
            done();
        }).catch( err => {
            done(err);
        });
    });


});