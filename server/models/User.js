/**
 * 사용자 테이블 정의 ( User )
 * userId - 사용자 아이디 
 * userName - 사용자 이름 
 * password - 비밀번호 
 * grade - 학년
 * role - 권한
 * etc - 비고
 * createdAt - 생성일자 
 * 
 * 관계
 * Paper - N : M
 */
export default ( sequelize, DataTypes ) => {
    let User =  sequelize.define("User", {
        userId : {
            type : DataTypes.STRING(30),
            allowNull : false,
            primaryKey : true,
            field : "user_id"
        },
        userName : {
            type : DataTypes.STRING(10),
            allowNull : false,
            field : "user_name"
        },
        password : {
            type : DataTypes.STRING(10),
            allowNull : false,
            field : "password"
        },
        grade : {
            type : DataTypes.STRING(10),
            allowNull : false,
            field : "grade"
        },
        role : {
            type : DataTypes.ENUM,
            values : [ "admin", "student", "teacher" ],
            field : "role",
            defaultValue : "student"
        },
        etc  :{
            type : DataTypes.STRING(2000),
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
        tableName : "USER",
        freezeTableName: true,
        underscored : true,
        updatedAt: "updatedAt",
        createdAt: "createdAt"
    });

    /**
     * User 관계설정
     */
    User.associate = ( db ) => {
        User.belongsToMany( db.Paper, {
            through: {
                model : db.UserPaperLog,
                allowNull : false,
                unique : false
            },
            foreignKey : "userId"
        });
    };

    return User;
}