const { Sequelize } = require("sequelize");


const sequelize = new Sequelize("disneydb", process.env.DB_USER,process.env.DB_PASS, {
  dialect: "mssql",
  host: process.env.HOST,
  port: process.env.DB_PORT,
  dialectOptions: {
    instanceName: process.env.DB_INSTANCE
  }
});


module.exports = sequelize;