import db from "../models/index";
import _ from "lodash";

let Paper         = db.Paper;
let PaperQuestion = db.PaperQuestion;

export default {

    findAllPaper( req, res, next ){
        Paper.findAll({
            where : {
                groupId : req.params.groupId
            }
        })
            .then( paperList => {
                res.send({
                    code : "success",
                    paperList
                });    
            });
    },

    findOnePaper( req, res, next ){
        Paper.find({
            where : {
                paperId : req.params.paperId
            }
        }).then( paper => {
            paper.getPaperQuestions()
                .then( questions => {
                    res.send({
                        code : "success",
                        paper,
                        questions
                    });
                });
        })
    },

    createPaper( req, res, next ){
        db.sequelize.transaction(t => {
            return Paper.create(req.body,{
                    transaction : t
                }).then( paper => {
                    let questions = _.map( req.body.question.split("\n"),  question => {
                        return {
                            question,
                            paperId : paper.get("paperId")
                        };
                    });
                    return PaperQuestion.bulkCreate(questions,{
                        transaction : t
                    });
                });
        }).then( () => {
            res.send({
                code : "success"
            });
        });
        
    },

    updatePaper( req, res, next ){
        db.sequelize.transaction(t => {
            return Paper.update( req.body, {
                    where : {
                        paperId : req.params.paperId 
                    }
                }, {
                    transaction : t
                }).then( ( affectedCount, affectedRow ) => {
                    return PaperQuestion.destroy({
                        where : {
                            paperId : req.params.paperId
                        }
                    },{ 
                        transaction : t
                    });
                }).then( count => {
                    let questions = _.map( req.body.question.split("\n"),
                     question => {
                        return {
                            question,
                            paperId : req.params.paperId 
                        };
                    });
                    return PaperQuestion.bulkCreate(questions,{
                        transaction : t
                    });
                });
        }).then( () => {
            res.send({
                code : "success",
                message : "학습지가 수정되었습니다."
            });
        });
    },

    destroyPaper( req, res, next ){
        Paper.destroy({
            where : {
                paperId : req.params.paperId
            }
        }).then( count => {
            res.send({
                code : "success",
                message : "학습지가 삭제되었습니다."
            });
        });
    }


}