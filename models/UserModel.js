var db = require ("../config/dbConfig.js");
var user=db.sequelize.define("TwiteerUser",{
    //attributes
    id:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    username:{
        type:db.Sequelize.TEXT,
        allowNull:false
    },
    gender:{
        type:db.Sequelize.TEXT,
        allowNull:true
    },
    phone:{
        type:db.Sequelize.BIGINT,
        allowNull:true
    },
    email:{
        type:db.Sequelize.TEXT,
        allowNull:true
    },
    bio:{
        type:db.Sequelize.TEXT,
        allowNull:true
    },
    interest:{
        type:db.Sequelize.TEXT,
        allowNull:true
    },
    password:{
        type:db.Sequelize.TEXT,
        allowNull:false
    },
    profileImage:{
        type:db.Sequelize.TEXT,
        allowNull:true
    }
    
},{
    freezeTableName:true,
    tablesName:"TwiteerUser"

});
user.sync({force:false})
.then(function(){

})
.catch(function(err){
    console.log(err);
});


module.exports=user;
