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
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [8, 15],
        is: ["^[a-z]+$", "i"],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 15],
        checkPass(password) {
          if (password.lenght <= 8) {
            throw new Error("Password too short!");
          } else if (password.lenght >= 16) {
            throw new Error("Password too long!");
          }
        },
      },
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        checkNum(value) {
          if (!(value >= 1 || value <= 3)) {
            throw new Error("Type not avalible");
          }
        },
      },
    },
  },
  {
    timestamps: false,
    tableName: "Usuarios",
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

// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = User;
