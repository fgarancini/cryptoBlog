const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db_connection");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    user_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        len: [8, 12],
        is: /^[0-9a-f]{64}$/i
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [8, 12],
      },
    },
  },
  {
    timestamps: false,
    tableName:"Usuarios",
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    instaceMethods: {
      validPassword: async (password, hash) => {
        return await bcrypt.compareSync(password, hash);
      },
    },
  }
);

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

module.exports = User;
