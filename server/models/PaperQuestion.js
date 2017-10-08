/**
 * 학습지 문제 테이블 정의 ( PaperQuestion )
 * paperId : 학습지 ID
 * question : 문제 
 * 
 * 관계
 * Paper - 1 : N
 */
export default ( sequelize, DataTypes ) => {
    let PaperQuestion = sequelize.define("PaperQuestion", {
        paperId : {
            type : DataTypes.INTEGER,
            field : "paper_id"
        },
        questionId : {
            type : DataTypes.INTEGER,
            autoIncrement : true ,
            primaryKey : true,
            field : "question_id"
        },
        question : {
            type : DataTypes.STRING(300),
            allowNull : false,
            field : "question"
        }
    },{
        tableName : "PAPER_QUESTION",
        freezeTableName: true,
        underscored : true
    });

    /**
     * PaperQuestion 관계설정
     */
    PaperQuestion.associate = ( db ) => {
        PaperQuestion.belongsTo( db.Paper, {
            onDelete : "CASCADE",
            foreignKey : {
                name : "paperId",
                allowNull : false
            },
            targetKey : "paperId"
        });
    };

    return PaperQuestion;
}