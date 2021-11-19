const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db_connection");

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();