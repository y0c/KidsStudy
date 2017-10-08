export default {
    sessionSecret : "#####appSecret",
    db : {
        host : null,
        username : null,
        password : null,
        database : "kidsStudy",
        //Sequelize 옵션 
        opts : {
            dialect: "sqlite",
            storage: '../../db.sqlite',
        }
    }
    
} 