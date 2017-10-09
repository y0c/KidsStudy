import db from "../models/index";

let PaperGroup = db.PaperGroup;

export default {
    
    findAllPaperGroup( req, res, next ){
        PaperGroup.findAll()
            .then( paperGroupList => {
                res.send({
                    code : "success",
                    paperGroupList
                }) 
            });
    },

    findOnePaperGroup( req, res, next ){
        PaperGroup.findOne({ 
            where : {
                groupId : req.params.groupId
            }
        }).then( paperGroup => {
            res.send({
                    code : "success",
                    paperGroup
                });
        });
    },

    createPaperGroup( req, res, next ){
        PaperGroup.findOrCreate( {
            where : {
                groupId : req.body.groupId
            },
            defaults : req.body
        }).spread( ( paperGroup, created ) => {
            if( created ){
                res.send({
                    code : "success",
                    message : "학습지 그룹이 생성되었습니다.",
                    paperGroup
                });
            } else {
                res.send({
                    code : "fail",
                    message : "이미 생성된 학습지 그룹이 있습니다."
                });
            }
        });
    },

    updatePaperGroup( req, res, next ){
        PaperGroup.update( req.body , {
            where : {
                groupId : req.params.groupId
            }
        }).then( ( affectedCount, afftectedRow ) => {
            if( affectedCount > 0 ){
                res.send({
                    code : "success",
                    message : "학습지 그룹이 수정되었습니다."
                });
            }
        })
    },

    destroyPaperGroup( req, res, next ){
        PaperGroup.destroy({
            where : {
                groupId : req.params.groupId
            }
        }).then( affectedCount => {
            if( affectedCount > 0 ){
                res.send({
                    code : "success",
                    message : "학습지 그룹이 삭제되었습니다."
                });
            }
        });
    }
}