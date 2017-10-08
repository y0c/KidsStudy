import db from "../../models/index";
import { assert } from "chai";

describe( "PaperGroup Model Test", () => {

    before(() => {
        return db.sequelize.sync({ force : true });
    });

    it( "#Insert PaperGroup", ( done ) => {
        db.PaperGroup.create({
            groupId : "A",
            groupTitle : "초등학교 수학 학습지",
            createdAt : new Date()
        }).then( ( papergroup ) => {
            assert.isDefined( papergroup, "PaperGroup is Undefined");
            done();
        }).catch( ( err ) => {
            done(err);
        });
    });

    it("#Insert PaperGroup With associate Paper" , ( done ) => {
        db.PaperGroup.create({
            groupId : "B",
            groupTitle : "중등수학",
            createdAt : new Date()
        }).then( (paperGroup) => {
            return db.Paper.create({
                groupId : paperGroup.getDataValue("groupId"),
                step : "110",
                description : "뺄셈을 하세요",
                paperTitle :"뺄셈(0)",
                createdAt : new Date()
            });
        }).then( (paper) => {
            assert.isDefined( paper , "Paper is Undefined");
            done();
        }).catch( (err) => {
            done(err);
        });
    });

    it("#Updaet PaperGroup", ( done ) => {
        db.PaperGroup.create({
            groupId : "C",
            groupTitle : "중등수학",
            createdAt : new Date()
        }).then( (paperGroup) => {
            return db.PaperGroup.update({
                    groupTitle : "고등수학" 
                }, {
                    where : {
                        groupId : paperGroup.get("groupId")
                    }
                })
        }).then( ( affectedCount, affectedRow ) => {
            assert( affectedCount > 0 );
            done();   
        });;
    });


    it("#Delete PaperGroup", ( done ) => {
        db.PaperGroup.create({
            groupId : "D",
            groupTitle : "중등수학",
            createdAt : new Date()
        }).then( (paperGroup) => {
            return paperGroup.destroy();
        }).then( () => {
            // assert.isDefined(affectedRow);

            done();
        }).catch( (err) => {
            done(err);
        });
    });


    it("#Delete PaperGroup With Cascade", ( done ) => {
        db.PaperGroup.destroy({
            where : {
                groupId : "A"
            }
        }).then( (affectedCount) => {
            assert( affectedCount > 0 );
            return db.Paper.findOne({ where : {
                groupId : "A"
            }});
        }).then( (paper) => {
            assert.isNull(paper);
            done();
        })
        .catch( (err) => {
            done(err);
        });
    });

})