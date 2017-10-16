export default {
    sessionSecret : "#####appSecret",
    db : {
        host : null,
        username : null,
        password : null,
        database : "KidsStudy",
        //Sequelize 옵션 
        opts : {
            dialect: "sqlite",
            storage: "dev.db"
        }
    }
    
} 