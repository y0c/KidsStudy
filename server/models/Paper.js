/**
 * 학습지 테이블 정의 ( Paper )
 * groupId : 학습지 그룹 ID
 * paperId : 학습지 ID
 * step : 학습지 단계
 * description : 설명 
 * createdAt : 생성일자
 * 
 * 관계 
 * PaperGroup - 1 : N
 * PaperQuestion - N : 1
 * User - N : M
 * 
 */
export default ( sequelize, DataTypes ) => {
    let Paper = sequelize.define("Paper",{
        groupId : {
            type : DataTypes.STRING(10),
            field : "group_id"
        },
        paperId : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            field : "paper_id"
        },
        paperTitle : {
            type : DataTypes.STRING(200),
            allowNull : false,
            field : "paper_title"
        },
        step : {
            type : DataTypes.STRING(20),
            allowNull : false,
            field : "step"
        },
        description : {
            type : DataTypes.STRING(2000),
            allowNull : true,
            field : "description"
        },
        operationType : {
            type : DataTypes.ENUM,
            values : [ "calculate" ],
            defaultValue : "calculate",
            field : "operation_type"
        },
        displayType : {
            type : DataTypes.ENUM,
            values : [ "vertical", "horizontal" ],
            defaultValue : "horizontal",
            field : "display_type"
        },
        etc : {
            type : DataTypes.TEXT,
            allowNull : true,
            field : "etc"
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
        tableName : "PAPER",
        freezeTableName: true,
        underscored : true,
        updatedAt: "updatedAt",
        createdAt: "createdAt"
    });

    /**
     * Paper 관계설정
     */
    Paper.associate = ( db ) => {
        Paper.belongsToMany( db.User, {
            through: {
                model : db.UserPaperLog,
                allowNull : false,
                unique : false
            },
            foreignKey : "paperId"
        });

        Paper.hasMany( db.PaperQuestion, {
            foreignKey : {
                name : "paperId",
                allowNull : false
            },
            sourceKey : "paperId"
        });
    };

    return Paper;
}