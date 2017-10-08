export default {
    sessionSecret : "#####appSecret",
    db : {
        host : null,
        username : null,
        password : null,
        database : "test11",
        //Sequelize 옵션 
        opts : {
            dialect: "sqlite",
            storage: '../../test1.sqlite',
        }
    }
    
} 