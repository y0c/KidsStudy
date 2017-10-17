/**
 * 사용자 학습지 로그 테이블 정의( UserPaperLog )
 * logId - 로그 아이디
 * userId - 학생 아이디
 * paperId - 학습지 아이디 
 * score - 점수 
 * raiting - 등급
 * solvingTime - 풀이시간 (소요시간)
 * 
 * 관계
 * User - Paer  N : M  association Table 
 */
export default ( sequelize, DataTypes ) => {
    let UserPaperLog = sequelize.define("UserPaperLog", {
        logId : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            field : "log_id"
        },
        userId : {
            type : DataTypes.STRING(30),
            allowNull : false,
            field : "user_id"
        },
        paperId : {
            type : DataTypes.INTEGER,
            allowNull : false,
            field : "paper_id"
        },
        score : {
            type : DataTypes.INTEGER,
            allowNull : false,
            field : "score"
        },
        raiting : {
            type : DataTypes.STRING(1),
            allowNull : false,
            field : "raiting"
        },
        solvingTime : {
            type : DataTypes.STRING(20),
            allowNull : false,
            field : "solving_time"
        },
        createdAt : {
            type : DataTypes.DATE,
            field : "created_at"
        },
        updatedAt : {
            type : DataTypes.DATE,
            field : "updated_at"
        }
    },{
        tableName : "USER_PAPER_LOG",
        freezeTableName: true,
        underscored : true,
        updatedAt: "updatedAt",
        createdAt: "createdAt"
    }); 

    return UserPaperLog;
}