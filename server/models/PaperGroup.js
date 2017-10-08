/**
 * 학습지 그룹 테이블 정의 ( PaperGroup )
 * groupId : 학습지 그룹 ID
 * groupTitle : 학습지 그룹 타이틀 
 * createdAt : 생성일자
 * 
 * 관계
 * Paper - N : 1
 */
export default ( sequelize, DataTypes ) => {
    let PaperGroup = sequelize.define("PaperGroup", {
        groupId : {
            type : DataTypes.STRING(10),
            primaryKey : true,
            field : "group_id"
        },
        groupTitle : {
            type : DataTypes.STRING(300),
            allowNull : false,
            field : "group_title"
        }
    },{
        tableName : "PAPER_GROUP",
        freezeTableName: true,
        underscored : true
    });

    /**
     * PaperGroup 관계 설정
     */
    PaperGroup.associate = ( db ) => {
        PaperGroup.hasMany( db.Paper, {
            foreignKey : {
                name : "groupId",
                allowNull : false
            }
        });
    };

    return PaperGroup;
}